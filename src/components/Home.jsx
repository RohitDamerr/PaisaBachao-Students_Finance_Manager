import React from 'react';
import styles from '../Styles/Home.module.css';


const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to PaisaBachao</h1>
      <p className={styles.subtitle}>Your Personal Finance Manager</p>
      <div className={styles.cta}>
        <button className={styles.button}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;