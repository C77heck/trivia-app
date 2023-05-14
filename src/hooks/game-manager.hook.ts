import { useEffect, useState } from 'react';
import { Question } from './archived-question-manager.hook';
import { useQuestionManager } from './question-manager.hook';

export interface AnsweredQuestion extends Question {
    userAnswer: 'False' | 'True';
}

export const useGameManager = () => {
    const { questions, isLoading } = useQuestionManager();
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(questions?.[0] || null);
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);

    useEffect(() => {
        if (isLoading || !questions?.length) {
            return;
        }

        setCurrentQuestion(questions[0]);
    }, [isLoading, questions]);

    const addAnsweredQuestion = (question: AnsweredQuestion) => {
        setAnsweredQuestions([...answeredQuestions, question]);
        setCurrentQuestion(questions[question.key + 1]);
    };

    return { currentQuestion, addAnsweredQuestion };
};
