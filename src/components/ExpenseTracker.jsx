import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from '../Styles/ExpenseTracker.module.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Food', 'Transport', 'Rent', 'Entertainment', 'Education', 'Health', 'Other'];

  const addExpense = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!category || !amount || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const newExpense = {
      id: new Date().getTime(), // Unique ID based on timestamp
      category,
      amount: parseFloat(amount),
      date,
      description,
    };

    setExpenses([...expenses, newExpense]);
    setCategory('Food');
    setAmount('');
    setDate('');
    setDescription('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const getDailyExpenses = () => {
    const dailyExpenses = {};
    expenses.forEach((expense) => {
      const day = expense.date;
      if (!dailyExpenses[day]) {
        dailyExpenses[day] = 0;
      }
      dailyExpenses[day] += expense.amount;
    });
    return Object.keys(dailyExpenses).map((day) => ({
      day,
      total: dailyExpenses[day],
    }));
  };

  const getWeeklyExpenses = () => {
    const weeklyExpenses = {};
    expenses.forEach((expense) => {
      const week = getWeekNumber(new Date(expense.date));
      if (!weeklyExpenses[week]) {
        weeklyExpenses[week] = 0;
      }
      weeklyExpenses[week] += expense.amount;
    });
    return Object.keys(weeklyExpenses).map((week) => ({
      week: `Week ${week}`,
      total: weeklyExpenses[week],
    }));
  };

  const getMonthlyExpenses = () => {
    const monthlyExpenses = {};
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0;
      }
      monthlyExpenses[month] += expense.amount;
    });
    return Object.keys(monthlyExpenses).map((month) => ({
      month,
      total: monthlyExpenses[month],
    }));
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div className={styles.expenseTracker}>
      <h2 className={styles.title}>Expense Tracker</h2>

      {/* Add Expense Form */}
      <div className={styles.addExpenseForm}>
        <h3>Add New Expense</h3>
        <form onSubmit={addExpense}>
          <div className={styles.formGroup}>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Amount ($):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.addButton}>
            Add Expense
          </button>
        </form>
      </div>

      {/* Expense List */}
      <div className={styles.expenseList}>
        <h3>Expense List</h3>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount ($)</th>
                <th>Date</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.category}</td>
                  <td>{expense.amount.toFixed(2)}</td>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Insights Section */}
      <div className={styles.insights}>
        <h3>Expense Insights</h3>

        {/* Daily Expenses Bar Chart */}
        <div className={styles.chartContainer}>
          <h4>Daily Expenses</h4>
          {getDailyExpenses().length > 0 ? (
            <BarChart
              width={600}
              height={300}
              data={getDailyExpenses()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#00ff88" />
            </BarChart>
          ) : (
            <p>No daily expenses recorded yet.</p>
          )}
        </div>

        {/* Weekly Expenses Bar Chart */}
        <div className={styles.chartContainer}>
          <h4>Weekly Expenses</h4>
          {getWeeklyExpenses().length > 0 ? (
            <BarChart
              width={600}
              height={300}
              data={getWeeklyExpenses()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#00cc66" />
            </BarChart>
          ) : (
            <p>No weekly expenses recorded yet.</p>
          )}
        </div>

        {/* Monthly Expenses Bar Chart */}
        <div className={styles.chartContainer}>
          <h4>Monthly Expenses</h4>
          {getMonthlyExpenses().length > 0 ? (
            <BarChart
              width={600}
              height={300}
              data={getMonthlyExpenses()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#00994d" />
            </BarChart>
          ) : (
            <p>No monthly expenses recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;