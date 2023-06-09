import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaireContext } from '../../contexts/questionnaire.context';
import { useArchivedQuestionManager } from '../../hooks/archived-question-manager.hook';
import { Constants } from '../../libs/constants';
import { Button } from '../shared-ui/buttons/button';
import { BaseView } from '../shared-ui/layout/base-view';
import { AnswerResult } from './answer-result';

export const Scoreboard = () => {
    const { questionnaire, clearQuestionnaire, getScore } = useQuestionnaireContext();
    const { archiveQuestions } = useArchivedQuestionManager();
    const routes = Constants.routes;
    const navigate = useNavigate();
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        try {
            setResult(getScore() || null);
        } catch (e) {
            if ((e as Error)?.message === 'Incomplete') {
                navigate(routes.questionnaire.link);
            }
        }
    }, []);

    if (!result) {
        return null;
    }

    const handleOnClick = () => {
        archiveQuestions(questionnaire);
        clearQuestionnaire();
        navigate(routes.home.link);
    };

    return <BaseView>
        <div data-testid={'scoreboard'} className={'col-3 display-flex flex-column'}>
            <h2 className={'fs-24 text-align-center fw--600 appear-smoothly'}>You scored</h2>
            <h2 className={'fs-24 text-align-center fw--600 appear-smoothly'}>{result.score} / 10</h2>
        </div>
        <div className={'col-19'}>
            <div className={'row flex-column scroll-view flex-nowrap'}>
                {result?.rightAnswers?.map((question, index) => <AnswerResult
                    delay={(index + 1) * 100}
                    key={question}
                    isRight={true}
                    question={question}
                />)}
                {result?.wrongAnswers?.map((question, index) => <AnswerResult
                    delay={((result.rightAnswers.length + index) + 1) * 100}
                    key={question}
                    isRight={false}
                    question={question}
                />)}
            </div>
        </div>
        <div className={'col-2 display-flex center'}>
            <Button
                buttonStyle={'link'}
                onClick={handleOnClick}
            >
                <span className={'appear-smoothly fs-24 text-align-center uppercase hover-opacity'}>Play again?</span>
            </Button>
        </div>
    </BaseView>;
};
