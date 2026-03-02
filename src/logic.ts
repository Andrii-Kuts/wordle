export const WORD_LENGTH = 5;
export const GUESSES_COUNT = 6;

export type State = {
    secretWord: string,
    guesses: string[],
};

const characterStates = {
    missing: 'gray',
    wrongPosition: 'yellow',
    correct: 'green',
    default: 'black',
};

export function createState(): State {
    return { secretWord: 'dizzy', guesses: [ 'dying', 'addon', 'zozzo'] };
}

export function getDefaultGuessState(): string[] {
    return Array.from<string>({ length: WORD_LENGTH }).fill(characterStates.default);
}

export function getGuessState(
    state: State,
    guess: string,
): string[] {
    const states = Array.from<string>({ length: WORD_LENGTH });
    const characterCounts = new Map<string, number>();
    state.secretWord.split('').forEach((character) => {
        characterCounts.set(character, (characterCounts.get(character) ?? 0) + 1);
    });

    // first pass for correct symbols
    for(let position = 0; position < WORD_LENGTH; position++) {
        if (state.secretWord[position] != guess[position])
            continue;
        const count = characterCounts.get(guess[position]) ?? 0;
        characterCounts.set(guess[position], count-1);
        states[position] = characterStates.correct;
    }
    // second pass for missing/wrong position
    for(let position = 0; position < WORD_LENGTH; position++) {
        if(states[position] != undefined)
            continue;
        const count = characterCounts.get(guess[position]) ?? 0;
        if (count == 0)
            states[position] = characterStates.missing;
        else {
            characterCounts.set(guess[position], count-1);
            states[position] = characterStates.wrongPosition;
        }
    }
    return states;
}   

export function getKeyboardCharacterState(
    state: State,
    character: string,
): string {
    const positions = Array.from<number>({ length: WORD_LENGTH})
        .map((_, index) => index)
        .filter((position) => state.secretWord[position] == character);
    if (positions.length == 0)
        return characterStates.missing;
    console.log(character, positions);
    const correct = state.guesses.some(guess => {
        for (const position of positions) {
            if(state.secretWord[position] == guess[position])
                return true;
        }
        return false;
    });
    if(correct)
        return characterStates.correct;
    return characterStates.wrongPosition;
}
