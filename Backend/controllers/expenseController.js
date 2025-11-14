import Expense from "../models/Expense.js";

export async function addExpense(req, res, next) {
  try {
    req.body.user = req.user._id;
    const expense = await Expense.create(req.body);
    res.status(201).json({ msg: "added a new expense", expense });
  } catch (error) {
    next(error);
  }
}

export async function getAllExpenses(req, res, next) {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    if (!expenses) return res.status(404).json({ msg: "Expenses not found" });

    res.status(200).json({ msg: "All Expense", expenses });
  } catch (error) {
    next(error);
  }
}

export async function getExpense(req, res, next) {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "not authorized to update this expense" });
    }

    res.status(200).json({ msg: "Your Expense", expense });
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(req, res, next) {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "not authorized to update this expense" });
    }

    const opts = { runValidators: true, new: true };
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      opts
    );

    res.status(200).json({ msg: "update an expense", expense: updatedExpense });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "not authorized to update this expense" });
    }

    const deletedExpense = await expense.deleteOne();

    res
      .status(200)
      .json({ msg: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    next(error);
  }
}
