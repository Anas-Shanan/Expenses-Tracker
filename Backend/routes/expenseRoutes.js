import { Router } from "express";
import * as Expense from "../controllers/expenseController.js";
import { authentication } from "../middleware/authMiddleware.js";

const ExRouter = Router();

ExRouter.get("/", authentication, Expense.getAllExpenses).post(
  "/",
  authentication,
  Expense.addExpense
);

ExRouter.route("/:id")
  .get(authentication, Expense.getExpense)
  .patch(authentication, Expense.updateExpense)
  .delete(authentication, Expense.deleteExpense);

export default ExRouter;
