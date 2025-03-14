import React from 'react';
import styles from '../Styles/Budgeting.module.css';

const Budgeting = () => {
  return (
    <div className={styles.budgeting}>
      <h2 className={styles.title}>Budgeting</h2>
      <div className={styles.content}>
        <p>Manage your budget here.</p>
      </div>
    </div>
  );
};

export default Budgeting;