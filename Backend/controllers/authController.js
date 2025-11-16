import User from "../models/User.js";

export async function register(req, res) {
  try {
    const { name, email, password, bio } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide name, email and password" });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    // Handle profile picture if uploaded
    let profilePic = "";
    if (req.file) {
      profilePic = `uploads/${req.file.filename}`;
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      bio,
      profilePic,
    });
    // problem was userinfo not showing up after registeration- generate token and set cookie so the user is logged in after register
    const token = newUser.generateToken();
    const cookieExpireHours = Number(process.env.COOKIE_EXPIRE || 24);
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      expires: new Date(Date.now() + cookieExpireHours * 60 * 60 * 1000),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    };

    newUser.password = undefined;
    res
      .status(201)
      .cookie("token", token, options)
      .json({
        msg: "user registered",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide email and password to login" });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = user.generateToken();
    const cookieExpireHours = Number(process.env.COOKIE_EXPIRE || 24);
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      expires: new Date(Date.now() + cookieExpireHours * 60 * 60 * 1000),
      httpOnly: true,
      secure: isProduction, // Only send over HTTPS in production
      sameSite: isProduction ? "none" : "lax", // Allow cross-origin cookies in production
    };
    user.password = undefined; // just more secure
    res
      .status(200)
      .cookie("token", token, options)
      .json({
        msg: "user logged in",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
}

export async function logout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({
    msg: "User logged out successfully",
  });
}

export async function currentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Server error!" });
  }
}
