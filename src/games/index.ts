import type { Game } from './types';
import wordle from './Wordle';
import go from './Go';

export type { Game } from './types';

const games: Record<string, Game> = {
  wordle,
  go,
};

export default games;
