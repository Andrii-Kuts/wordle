import { useParams } from 'react-router';
import games from '../games';
import Header from '../Header';
import UnknownGame from '../UnknownGame';

const Play: React.FC = () => {
  const { slug } = useParams();

  const game = slug && games[slug];
  if (!game) {
    return <UnknownGame slug={slug ?? 'undefined'} />;
  }
  const { title, Play } = game;
  return (
    <>
      <Header />
      <h1>{title}</h1>
      <Play />
    </>
  );
};

export default Play;
