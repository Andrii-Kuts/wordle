import { lazy } from 'react';
import type { Game } from '../types';

const game: Game = {
  title: 'Wordle',
  description: 'Guess a 5 letter word in just 6 guesses',
  Play: lazy(() => import('./Play')),
};

export default game;
