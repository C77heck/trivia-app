import { createContext, useContext, useState } from 'react';
import { Children } from '../features/shared-ui/layout/base-view';
import { ApiResponse, Question, useArchivedQuestionManager } from '../hooks/archived-question-manager.hook';
import { HttpError } from '../libs/http-error';

export interface IQuestionnaireContext {
    isLoading: boolean;
    questionnaire: Question[];
    currentQuestion: null | Question;
    nextQuestion: () => void;
    clearQuestionnaire: () => void;
    setupNewGame: () => void;
    getScore: () => ScoreResponse;
    saveQuestionnaire: (questionnaire: Question[]) => void;
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
});

export const WithQuestionnaireContext = ({ children }: { children: Children }) => {
    const [questionnaire, setQuestionnaire] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const { getArchivedQuestions } = useArchivedQuestionManager();

    const setupNewGame = async () => {
        try {
            setIsLoading(true);
            const questions = await getNewQuestionnaire();
            setQuestionnaire(questions);
            setCurrentQuestion(questions?.[0]);
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
            if (!questions.includes(question?.question) && !pastQuestions.includes(question.question)) {
                questionsToSave.push(question);
                questions.push(question?.question);
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
                    if (tries < 13) {
                        return getQuestions(questionsToSave, tries + 1, difficulty);
                    }

                    throw new Error('Insufficient questions');
                default:
                    throw new Error('difficulty must be set');
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
        setQuestionnaire([]);
        setCurrentQuestion(null);
    };

    const saveQuestionnaire = (questionnaireToSave: Question[]): void => {
        setQuestionnaire(questionnaireToSave);
    };

    const getScore = (): ScoreResponse => {
        const rightAnswers: string[] = [];
        const wrongAnswers: string[] = [];

        if (!questionnaire?.length) {
            throw new Error('Incomplete');
        }

        for (const answeredQuestion of questionnaire) {
            if (!('userAnswer' in answeredQuestion)) {
                throw new Error('Incomplete');
            }

            if (answeredQuestion.correct_answer.includes(answeredQuestion?.userAnswer || '')) {
                rightAnswers.push(answeredQuestion?.question);
                continue;
            }

            wrongAnswers.push(answeredQuestion?.question);
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
        setupNewGame,
        getScore
    }}>
        {children}
    </QuestionnaireContext.Provider>;
};

export const useQuestionnaireContext = () => useContext(QuestionnaireContext);
