import type React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <p className={styles.home_button}>
        <Link className={styles.home_button__link} to="/">
          {'<'} Home
        </Link>
      </p>
    </div>
  );
};

export default Header;
