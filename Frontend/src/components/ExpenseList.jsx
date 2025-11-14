import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

const API_BASE = "http://localhost:5000/api";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [addForm, setAddForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE}/expense`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data.expenses || []);
      } else {
        setError("Failed to fetch expenses");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses");
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: parseFloat(addForm.amount),
          category: addForm.category,
          description: addForm.description,
          date: addForm.date,
        }),
      });

      if (!response.ok) {
        const { msg } = await response.json();
        setError(msg || "Failed to add expense");
        setLoading(false);
        return;
      }

      setSuccess("Expense added successfully!");
      setAddForm({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setShowAddForm(false);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense._id);
    setEditForm({
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description || "",
      date: expense.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : "",
    });
  };

  const handleUpdateExpense = async (expenseId) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/expense/${expenseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: parseFloat(editForm.amount),
          category: editForm.category,
          description: editForm.description,
          date: editForm.date,
        }),
      });

      if (!response.ok) {
        const { msg } = await response.json();
        setError(msg || "Failed to update expense");
        setLoading(false);
        return;
      }

      setEditingExpense(null);
      fetchExpenses();
      setSuccess("Expense updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/expense/${expenseId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const { msg } = await response.json();
        setError(msg || "Failed to delete expense");
        setLoading(false);
        return;
      }

      fetchExpenses();
      setSuccess("Expense deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingExpense(null);
    setEditForm({ amount: "", category: "", description: "", date: "" });
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setAddForm({
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="container">
      <div className="expense-header">
        <h2>Your Expenses</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-success"
        >
          {showAddForm ? "Cancel" : "Add Expense"}
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="add-form">
          <h3>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <label className="form-label">Amount: *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={addForm.amount}
                onChange={(e) =>
                  setAddForm({ ...addForm, amount: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category: *</label>
              <select
                value={addForm.category}
                onChange={(e) =>
                  setAddForm({ ...addForm, category: e.target.value })
                }
                className="form-select"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                value={addForm.description}
                onChange={(e) =>
                  setAddForm({ ...addForm, description: e.target.value })
                }
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date: *</label>
              <input
                type="date"
                value={addForm.date}
                onChange={(e) =>
                  setAddForm({ ...addForm, date: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-success">
                {loading ? "Adding..." : "Add Expense"}
              </button>
              <button type="button" onClick={cancelAdd} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses List */}
      {expenses.length === 0 ? (
        <p className="empty-state">
          No expenses found. Add some expenses to get started!
        </p>
      ) : (
        <div>
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className={`expense-card ${
                editingExpense === expense._id ? "editing" : ""
              }`}
            >
              {editingExpense === expense._id ? (
                <div>
                  <h3>Edit Expense</h3>
                  <div className="edit-form-group">
                    <label className="form-label">Amount: *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({ ...editForm, amount: e.target.value })
                      }
                      className="edit-form-input"
                      required
                    />
                  </div>
                  <div className="edit-form-group">
                    <label className="form-label">Category: *</label>
                    <select
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="edit-form-input"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                      <option value="Education">Education</option>
                      <option value="Travel">Travel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="edit-form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="edit-form-textarea"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label className="form-label">Date: *</label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="edit-form-input"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      onClick={() => handleUpdateExpense(expense._id)}
                      disabled={loading}
                      className="btn btn-success"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={loading}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="expense-item">
                    <div>
                      <h3 className="expense-amount">
                        {formatCurrency(expense.amount)}
                      </h3>
                      <p className="expense-detail">
                        <strong>Category:</strong> {expense.category}
                      </p>
                      {expense.description && (
                        <p className="expense-detail">
                          <strong>Description:</strong> {expense.description}
                        </p>
                      )}
                      <p className="expense-detail">
                        <strong>Date:</strong> {formatDate(expense.date)}
                      </p>
                    </div>
                    <div className="expense-actions">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        disabled={loading}
                        className="btn btn-primary btn-small"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense._id)}
                        disabled={loading}
                        className="btn btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}
    </div>
  );
}
