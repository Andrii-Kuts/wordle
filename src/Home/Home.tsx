import { Link } from 'react-router';
import games from '../games';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.home}>
        <h1>Games Hub</h1>
        <div className={styles.games}>
          {Object.entries(games).map((data) => {
            const [url, game] = data;
            return (
              <div className={styles.games__game} key={url}>
                <p className={styles.games__game__title}>{game.title}</p>
                {game.description && (
                  <div className={styles.games__game__description}>
                    {game.description}
                  </div>
                )}
                <Link to={`/play/${url}`} className={styles.games__game__play}>
                  {' '}
                  Play!
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
