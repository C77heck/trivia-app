import { Storage } from '../libs/storage';
import { AnsweredQuestion } from './game-manager.hook';

export type AnswerOption = 'True' | 'False';

export interface Question {
    key: number;
    category: string;
    type: 'boolean';
    difficulty: string;
    question: string;
    correct_answer: AnswerOption;
    incorrect_answers: AnswerOption[];
}

export interface ApiResponse {
    response_code: number;
    results: Question[];
}

export const useArchivedQuestionManager = () => {
    const storage = new Storage<string[]>('past-questionnaire');

    const getArchivedQuestions = () => {
        const questions = storage.get();

        return !questions?.length ? [] : questions;
    };

    const archiveQuestions = (questions: AnsweredQuestion[]): void => {
        const oldQuestions = questions?.map((question) => question?.question || '');
        const savedQuestions = getArchivedQuestions();

        storage.set([...oldQuestions, ...savedQuestions]);
    };

    return { archiveQuestions, getArchivedQuestions };
};
