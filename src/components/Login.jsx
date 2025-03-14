import React from 'react';
import styles from '../Styles/Login.module.css';

const Login = () => {
  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p className={styles.registerLink}>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;