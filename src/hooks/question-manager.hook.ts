import { useEffect, useState } from 'react';
import { HttpError } from '../libs/http-error';
import { Storage } from '../libs/storage';
import { ApiResponse, Question, useArchivedQuestionManager } from './archived-question-manager.hook';
import { AnsweredQuestion } from './game-manager.hook';

export interface QuestionManagerHookProps {
    questions: Question[];
    isLoading: boolean;
    saveQuestionnaire: (answeredQuestion: (AnsweredQuestion | Question)[]) => void;
    getCompletedQuestionnaire: () => AnsweredQuestion[];
    clearQuestionnaire: () => void;
}

export const useQuestionManager = (): QuestionManagerHookProps => {
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    const [questions, setQuestions] = useState<Question[]>([]);
    const storage = new Storage<(AnsweredQuestion | Question)[]>('current-questionnaire');
    const { getArchivedQuestions } = useArchivedQuestionManager();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const savedQuestions = storage.get();

                if (!savedQuestions?.length) {
                    return setupQuestionnaire();
                }

                setQuestions(savedQuestions);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const checkForDuplicates = (newQuestions: Question[]): { hasDuplicates: boolean; questionsToSave: Question[] } => {
        const pastQuestions = getArchivedQuestions();
        const questionsToSave = [];
        const questions: string[] = [];

        for (const question of newQuestions) {
            const existingQuestion = pastQuestions.find(pastQuestion => pastQuestion === question.question);
            if (existingQuestion) {
                continue;
            }

            if (!questions.includes(question.question)) {
                questionsToSave.push(question);
                questions.push(question.question);
            }

            if (questionsToSave.length === 10) {
                return { questionsToSave, hasDuplicates: false };
            }
        }

        return { questionsToSave, hasDuplicates: true };
    };

    const setupQuestionnaire = async () => {
        try {
            const questions = await getQuestions();
            const indexedQuestions = questions.map((question, index) => {
                question.key = index;

                return question;
            });

            setQuestions(indexedQuestions);
            storage.set(indexedQuestions);
        } catch (e) {
            throw e;
        }
    };

    const getQuestions = async (questions = [], tries = 0, difficulty: 'easy' | 'hard' = 'hard') => {
        try {
            const response = await fetch(`${endpoint}?amount=50&difficulty=${difficulty}&type=boolean`);

            if (!response.ok) {
                throw new HttpError('Something went wrong');
            }

            const responseData = await response.json() as ApiResponse;

            if (!responseData?.results?.length) {
                throw new HttpError('Something went wrong');
            }

            const { hasDuplicates, questionsToSave } = checkForDuplicates([...questions, ...responseData.results]);

            if (!hasDuplicates) {
                return questionsToSave;
            }

            switch (difficulty) {
                case 'hard':
                    return tries > 3
                        ? getQuestions(questionsToSave, 0, 'easy')
                        : getQuestions(questionsToSave, tries + 1, difficulty);
                case 'easy':
                    return tries > 13
                        ? questionsToSave
                        : getQuestions(questionsToSave, tries + 1, difficulty);
                default:
                    return questionsToSave;
            }
        } catch (e) {
            throw e;
        }
    };

    const clearQuestionnaire = (): void => {
        storage.clear();
    };

    const saveQuestionnaire = (questionnaire: (AnsweredQuestion | Question)[]): void => {
        storage.set(questionnaire);
    };

    const getCompletedQuestionnaire = (): AnsweredQuestion[] => {
        return storage.get() as AnsweredQuestion[];
    };

    return { questions, isLoading, saveQuestionnaire, getCompletedQuestionnaire, clearQuestionnaire };
};
