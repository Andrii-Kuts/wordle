import { lazy } from 'react';
import type { Game } from '../types';

const game: Game = {
  title: 'Go',
  description: 'Ancient east asian turn-based strategy game',
  Play: lazy(() => import('./Play')),
};

export default game;
