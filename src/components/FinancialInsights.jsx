import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import styles from '../Styles/FinancialInsights.module.css';

const FinancialInsights = () => {
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [savingsTime, setSavingsTime] = useState(0);

  // Sample data for charts
  const expenseData = [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Rent', value: 600 },
    { name: 'Entertainment', value: 200 },
  ];

  const COLORS = ['#00ff88', '#00cc66', '#00994d', '#006633'];

  const savingsData = [
    { month: 'Jan', savings: 1000 },
    { month: 'Feb', savings: 1500 },
    { month: 'Mar', savings: 2000 },
    { month: 'Apr', savings: 2500 },
    { month: 'May', savings: 3000 },
    { month: 'Jun', savings: 3500 },
  ];

  const incomeVsExpensesData = [
    { month: 'Jan', income: 2000, expenses: 1500 },
    { month: 'Feb', income: 2500, expenses: 1800 },
    { month: 'Mar', income: 3000, expenses: 2000 },
    { month: 'Apr', income: 2800, expenses: 2200 },
    { month: 'May', income: 3200, expenses: 2500 },
    { month: 'Jun', income: 3500, expenses: 2800 },
  ];

  const calculateSavingsTime = () => {
    const netIncome = monthlyIncome - monthlyExpenses;
    if (netIncome > 0) {
      const time = savingsGoal / netIncome;
      setSavingsTime(time.toFixed(2));
    } else {
      setSavingsTime('Not achievable with current income/expenses');
    }
  };

  return (
    <div className={styles.financialInsights}>
      <h2 className={styles.title}>Financial Insights</h2>

      {/* Savings Goal Calculator */}
      <div className={styles.calculator}>
        <h3>Savings Goal Calculator</h3>
        <div className={styles.inputGroup}>
          <label>Savings Goal ($):</label>
          <input
            type="number"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Monthly Income ($):</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Monthly Expenses ($):</label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>
        <button className={styles.calculateButton} onClick={calculateSavingsTime}>
          Calculate
        </button>
        <div className={styles.result}>
          <strong>Time to Achieve Goal:</strong> {savingsTime} months
        </div>
      </div>

      {/* Classified Search Options */}
      <div className={styles.searchOptions}>
        <h3>Classified Insights</h3>
        <div className={styles.searchButtons}>
          <button className={styles.searchButton}>Expense Breakdown</button>
          <button className={styles.searchButton}>Income vs Expenses</button>
          <button className={styles.searchButton}>Savings Progress</button>
          <button className={styles.searchButton}>Investment Growth</button>
        </div>
      </div>

      {/* Expense Breakdown Pie Chart */}
      <div className={styles.chartContainer}>
        <h3>Expense Breakdown</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={expenseData}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Income vs Expenses Bar Chart */}
      <div className={styles.chartContainer}>
        <h3>Income vs Expenses</h3>
        <BarChart
          width={600}
          height={300}
          data={incomeVsExpensesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#00ff88" />
          <Bar dataKey="expenses" fill="#ff4444" />
        </BarChart>
      </div>

      {/* Savings Progress Area Chart */}
      <div className={styles.chartContainer}>
        <h3>Savings Progress Over Time</h3>
        <AreaChart
          width={600}
          height={300}
          data={savingsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="savings" stroke="#00ff88" fill="#00ff88" fillOpacity={0.3} />
        </AreaChart>
      </div>

      {/* Financial Tips Section */}
      <div className={styles.tipsSection}>
        <h3>Financial Tips</h3>
        <ul>
          <li>Always track your expenses to understand where your money is going.</li>
          <li>Set a monthly budget and stick to it.</li>
          <li>Save at least 20% of your income for future goals.</li>
          <li>Avoid unnecessary debt and pay off high-interest loans first.</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialInsights;