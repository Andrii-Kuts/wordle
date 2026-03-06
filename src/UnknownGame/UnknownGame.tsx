import { Link } from 'react-router';
import styles from './UnknownGame.module.css';

const UnknownGame: React.FC<{
  slug: string;
}> = ({ slug }) => {
  return (
    <div className={styles.unknown_game}>
      <h1>Unknown Game</h1>
      <p className={styles.message}>Game {slug} doesn't exist!</p>
      <div className={styles.return_button}>
        <Link className={styles.return_button__link} to="/">
          Return home
        </Link>
      </div>
    </div>
  );
};

export default UnknownGame;
