import { useEffect, useState } from 'react';
import { Question } from './archived-question-manager.hook';
import { useQuestionnaireManager } from './questionnaire-manager.hook';

export interface ScoreResponse {
    rightAnswers: string[];
    wrongAnswers: string[];
    score: number;
}

export const useGameManager = () => {
    const { saveQuestionnaire, getQuestionnaire } = useQuestionnaireManager();
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>();

    useEffect(() => {
        const questionnaire = getQuestionnaire();

        if (!questionnaire?.length || currentQuestion) {
            return;
        }

        setCurrentQuestion(questionnaire[0]);
    }, []);

    const addAnsweredQuestion = (answeredQuestion: Question) => {
        const questionnaire = getQuestionnaire();
        const updatedQuestionnaire = questionnaire.map(question => {
            if (question.question === answeredQuestion.question) {
                return answeredQuestion;
            }

            return question;
        });

        const nextKey = answeredQuestion.key + 1;
        setCurrentQuestion(updatedQuestionnaire[nextKey]);
        saveQuestionnaire(updatedQuestionnaire);
    };

    const getScore = (): ScoreResponse => {
        const rightAnswers = [];
        const wrongAnswers = [];
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

    return { currentQuestion, addAnsweredQuestion, getScore, setCurrentQuestion };
};
