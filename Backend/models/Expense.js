import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: {
    type: Number,
    required: [true, "please add an amount"],
    min: [0, "Amount cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: [
      "Food",
      "Transportation",
      "Entertainment",
      "Healthcare",
      "Shopping",
      "Bills",
      "Education",
      "Travel",
      "Other",
    ],
  },
  description: { type: String, default: "" },
  date: {
    type: Date,
    required: [true, "please add a date"],
    default: Date.now,
  },
  createdAt: { type: Date, default: Date.now },
});

export default model("Expense", expenseSchema);
