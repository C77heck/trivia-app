import { useEffect, useState } from 'react';
import { Question } from './archived-question-manager.hook';
import { useQuestionManager } from './question-manager.hook';

export interface AnsweredQuestion extends Question {
    userAnswer: 'False' | 'True';
}

export interface ScoreResponse {
    rightAnswers: string[];
    wrongAnswers: string[];
    score: number;
}

export const useGameManager = () => {
    const { questions, saveQuestionnaire, getCompletedQuestionnaire } = useQuestionManager();
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(questions?.[0] || null);

    useEffect(() => {
        if (!questions?.length) {
            return;
        }
        console.log(questions);
        setCurrentQuestion(questions[0]);
    }, [questions]);

    const addAnsweredQuestion = (answeredQuestion: AnsweredQuestion) => {
        const questionnaire = getCompletedQuestionnaire();
        const updatedQuestionnaire = questionnaire.map(question => {
            if (question.question === answeredQuestion.question) {
                return answeredQuestion;
            }

            return question;
        });

        setCurrentQuestion(updatedQuestionnaire[answeredQuestion.key + 1]);
        saveQuestionnaire(updatedQuestionnaire);
    };

    const getScore = (): ScoreResponse => {
        const rightAnswers = [];
        const wrongAnswers = [];
        const completedQuestionnaire = getCompletedQuestionnaire();
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

    return { currentQuestion, addAnsweredQuestion, getScore };
};
