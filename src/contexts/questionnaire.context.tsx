import { createContext, useContext, useEffect, useState } from 'react';
import { Children } from '../features/shared-ui/layout/base-view';
import { ApiResponse, Question, useArchivedQuestionManager } from '../hooks/archived-question-manager.hook';
import { HttpError } from '../libs/http-error';
import { Storage } from '../libs/storage';

export interface IQuestionnaireContext {
    isLoading: boolean;
    questionnaire: Question[];
    currentQuestion: null | Question;
    nextQuestion: () => void;
    clearQuestionnaire: () => void;
    setupNewGame: () => void;
    getScore: () => ScoreResponse;
    saveQuestionnaire: (questionnaire: Question[]) => void;
    getQuestionnaire: () => Question[];
}

export interface ScoreResponse {
    rightAnswers: string[];
    wrongAnswers: string[];
    score: number;
}

const QuestionnaireContext = createContext<IQuestionnaireContext>({
    isLoading: false,
    questionnaire: [],
    currentQuestion: null,
    nextQuestion: () => {
    },
    clearQuestionnaire: () => {
    },
    setupNewGame: () => {
    },
    getScore: () => {
        return {} as ScoreResponse;
    },
    saveQuestionnaire: (_questionnaire: Question[]) => {
    },
    getQuestionnaire: (): Question[] => {
        return [];
    },
});

export const WithQuestionnaireContext = ({ children }: { children: Children }) => {
    const [questionnaire, setQuestionnaire] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const storage = new Storage<Question[]>('current-questionnaire');
    const { getArchivedQuestions } = useArchivedQuestionManager();

    useEffect(() => {
        console.log('CALLED CONTEXT');

        (async () => setupNewGame)();
    }, []);

    const setupNewGame = async () => {
        try {
            console.log('are we triggering it?');
            setIsLoading(true);
            const savedQuestions = storage.get();
            const questions = !savedQuestions?.length ? await getNewQuestionnaire() : savedQuestions;
            setQuestionnaire(questions);
            setCurrentQuestion(questions[0]);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const checkForDuplicates = (newQuestions: Question[]): { hasDuplicates: boolean; questionsToSave: Question[] } => {
        const pastQuestions = getArchivedQuestions();
        const questionsToSave: Question[] = [];
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

    const getQuestions = async (questions: Question[] = [], tries = 0, difficulty: 'easy' | 'hard' = 'hard'): Promise<Question[]> => {
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
        setQuestionnaire(questionnaire);
        storage.set(questionnaire);
    };

    const getQuestionnaire = (): Question[] => {
        return !questionnaire?.length ? storage.get() : questionnaire;
    };

    const getScore = (): ScoreResponse => {
        const rightAnswers: string[] = [];
        const wrongAnswers: string[] = [];
        const completedQuestionnaire = getQuestionnaire();

        for (const answeredQuestion of completedQuestionnaire) {
            if (!('userAnswer' in answeredQuestion)) {
                throw new Error('Incomplete');
            }

            if (answeredQuestion.correct_answer.includes(answeredQuestion?.userAnswer || '')) {
                rightAnswers.push(answeredQuestion.question);
                continue;
            }

            wrongAnswers.push(answeredQuestion.question);
        }

        return {
            rightAnswers,
            wrongAnswers,
            score: rightAnswers.length,
        };
    };

    return <QuestionnaireContext.Provider value={{
        isLoading,
        questionnaire,
        currentQuestion,
        nextQuestion,
        clearQuestionnaire,
        saveQuestionnaire,
        getQuestionnaire,
        setupNewGame,
        getScore
    }}>
        {children}
    </QuestionnaireContext.Provider>;
};

export const useQuestionnaireContext = () => useContext(QuestionnaireContext);
