import React from 'react';
import styles from './Layout.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to IntereStack</h1>
      <p>Join or create channels here.</p>
    </div>
  );
}