import React from 'react';
import styles from '../Styles/Register.module.css';

const Register = () => {
  return (
    <div className={styles.register}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Full Name" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <p className={styles.loginLink}>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;