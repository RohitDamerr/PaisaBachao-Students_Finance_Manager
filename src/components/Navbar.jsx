import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>PaisaBachao</div>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.link}>Home</Link></li>
        <li><Link to="/expense-tracker" className={styles.link}>Expense Tracker</Link></li>
        <li><Link to="/financial-insights" className={styles.link}>Financial Insights</Link></li>
        <li><Link to="/login" className={styles.link}>Login</Link></li>
        <li><Link to="/register" className={styles.link}>Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
