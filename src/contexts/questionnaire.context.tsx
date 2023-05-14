import { createContext, useContext, useEffect, useState } from 'react';
import { ApiResponse, Question, useArchivedQuestionManager } from '../hooks/archived-question-manager.hook';
import { HttpError } from '../libs/http-error';
import { Storage } from '../libs/storage';
import { Children } from '../screens/libs/base-view';

export interface IQuestionnaireContext {
    isLoading: boolean;
    questionnaire: Question[];
    currentQuestion: null | Question;
    nextQuestion: () => void;
    clearQuestionnaire: () => void;
    saveQuestionnaire: (questionnaire: Question[]) => void;
    getQuestionnaire: () => Question[];
}

const QuestionnaireContext = createContext<IQuestionnaireContext>({
    isLoading: false,
    questionnaire: [],
    currentQuestion: null,
    nextQuestion: () => {
    },
    clearQuestionnaire: () => {
    },
    saveQuestionnaire: (questionnaire: Question[]) => {
    },
    getQuestionnaire: (): Question[] => {
        return [];
    },
});

export const WithQuestionnaireContext = ({ children }: { children: Children }) => {
    const [questionnaire, setQuestionnaire] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    const storage = new Storage<Question[]>('current-questionnaire');
    const { getArchivedQuestions } = useArchivedQuestionManager();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const savedQuestions = storage.get();
                const questions = !savedQuestions?.length ? await getNewQuestionnaire() : savedQuestions;
                setQuestionnaire(questions);
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

    const getNewQuestionnaire = async () => {
        try {
            const questions = await getQuestions();

            const indexedQuestions = questions.map((question, index) => {
                question.key = index;

                return question;
            });

            return indexedQuestions;
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

    const nextQuestion = () => {
        setCurrentQuestion(prev => {
            const nextKey = (prev?.key || 0) + 1;

            return questionnaire[nextKey];
        });
    };

    const clearQuestionnaire = (): void => {
        storage.clear();
    };

    const saveQuestionnaire = (questionnaire: Question[]): void => {
        storage.set(questionnaire);
    };

    const getQuestionnaire = (): Question[] => {
        return storage.get();
    };
    return <QuestionnaireContext.Provider value={{
        isLoading,
        questionnaire,
        currentQuestion,
        nextQuestion,
        clearQuestionnaire,
        saveQuestionnaire,
        getQuestionnaire
    }}>
        {children}
    </QuestionnaireContext.Provider>;
};

export const useQuestionnaireContext = () => useContext(QuestionnaireContext);
