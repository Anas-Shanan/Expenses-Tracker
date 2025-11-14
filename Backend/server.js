import express from "express";
import connectDB from "./service/dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRouter from "./routes/authRoutes.js";
import ExRouter from "./routes/expenseRoutes.js";
import userRouter from "./routes/userRoutes.js";

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
const rawOrigins =
  process.env.CLIENT_URL ||
  process.env.FRONTEND_URL ||
  process.env.CLIENT_ORIGIN ||
  "http://localhost:5173";
const allowedOrigins = rawOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/expense", ExRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message || "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
