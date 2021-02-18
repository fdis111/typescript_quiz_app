import { shuffleArray } from './utils';

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = "hard"
}
export type Question = {
    category: string,
    correct_answer: string,
    difficulty: Difficulty,
    incorrect_answers: string[],
    question: string,
    type: string
}
export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string
}
export type QuestionState = Question & {answers: string[]};
  
export const fetchQuestions = async(amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await(await fetch(endPoint)).json();
     return data.results.map((question: Question) => (
         { 
            ...question, 
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])})
        )
    
}