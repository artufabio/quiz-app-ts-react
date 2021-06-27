// Contains the logic that we use to fetch datas from the Trivia API

import { shuffleArray } from './utils';

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export type QuestionState = Question & { answers: string[] }; //QuestionState has all the Question's properties + answers property

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await( await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
    ));
}