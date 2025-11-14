import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authentication(req, res, next) {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ msg: "no token found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    console.log("jwt Error", error);
    res.status(401).json({
      msg: "invalid token",
    });
  }
}
