import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArchivedQuestionManager } from '../../hooks/archived-question-manager.hook';
import { useGameManager } from '../../hooks/game-manager.hook';
import { useQuestionManager } from '../../hooks/question-manager.hook';
import { Constants } from '../../libs/constants';
import { BaseView } from '../../screens/libs/base-view';
import { AnswerResult } from './answer-result';

export const Scoreboard = () => {
    const { getScore } = useGameManager();
    const { getCompletedQuestionnaire, clearQuestionnaire } = useQuestionManager();
    const { archiveQuestions } = useArchivedQuestionManager();
    const { home, questionnaire } = Constants.routes;
    const navigate = useNavigate();
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        try {
            setResult(getScore() || null);
        } catch (e) {
            console.log(e);
            if (e?.message === 'Incomplete') {
                navigate(questionnaire.link);
            }
        }
    }, []);

    if (!result) {
        return null;
    }

    const handleOnClick = () => {
        const questionnaireToArchive = getCompletedQuestionnaire();
        archiveQuestions(questionnaireToArchive);
        clearQuestionnaire();
        navigate(home.link);
    };

    return <BaseView>
        <div className={'col-3 display-flex flex-column'}>
            <h2 className={'fs-24 text-align-center fw--600 appear-smoothly'}>You scored</h2>
            <h2 className={'fs-24 text-align-center fw--600 appear-smoothly'}>{result.score} / 10</h2>
        </div>
        <div className={'col-19'}>
            <div className={'row flex-column scroll-view flex-nowrap'}>
                {result.rightAnswers.map((question, index) => <AnswerResult
                    delay={(index + 1) * 100}
                    key={question}
                    isRight={true}
                    question={question}
                />)}
                {result.wrongAnswers.map((question, index) => <AnswerResult
                    delay={((result.rightAnswers.length + index) + 1) * 100}
                    key={question}
                    isRight={false}
                    question={question}
                />)}
            </div>
        </div>
        <div className={'col-2 display-flex center'}>
            <span
                onClick={handleOnClick}
                className={'appear-smoothly fs-24 text-align-center uppercase hover-opacity'}
            >Play again?</span>
        </div>
    </BaseView>;
};
