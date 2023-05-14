import { useEffect, useState } from 'react';
import { HttpError } from '../libs/http-error';
import { sleep } from '../libs/sleep';
import { Storage } from '../libs/storage';
import { ApiResponse, Question, useArchivedQuestionManager } from './archived-question-manager.hook';

export const useQuestionManager = (): { questions: Question[]; isLoading: boolean; } => {
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    const [questions, setQuestions] = useState<Question[]>([]);
    const storage = new Storage<Question[]>('current-questionnaire');
    const { getArchivedQuestions } = useArchivedQuestionManager();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                await sleep(800);
                const savedQuestions = storage.get();

                if (!savedQuestions?.length) {
                    await setupQuestionnaire();
                }

                setQuestions(savedQuestions);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const checkForDuplicates = (newQuestions: Question[]): { numberOfDuplicates: number; questionsToSave: Question[] } => {
        const pastQuestions = getArchivedQuestions();

        let numberOfDuplicates = 0;
        const questionsToSave = [];

        for (const question of newQuestions) {
            const existingQuestion = pastQuestions.find(pastQuestion => pastQuestion === question.question);
            if (existingQuestion) {
                numberOfDuplicates++;
                continue;
            }

            questionsToSave.push(question);
        }

        return { numberOfDuplicates, questionsToSave };
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

    const getQuestions = async (questions = [], amount = 10) => {
        try {
            const response = await fetch(`${endpoint}?amount=${amount}&difficulty=hard&type=boolean`);

            if (!response.ok) {
                throw new HttpError('Something went wrong');
            }

            const responseData = await response.json() as ApiResponse;

            if (!responseData?.results?.length) {
                throw new HttpError('Something went wrong');
            }

            const { numberOfDuplicates, questionsToSave } = checkForDuplicates([...questions, ...responseData.results]);

            if (!numberOfDuplicates) {
                return questionsToSave;
            }

            return getQuestions(questionsToSave, numberOfDuplicates);
        } catch (e) {
            throw e;
        }
    };

    return { questions, isLoading };
};
