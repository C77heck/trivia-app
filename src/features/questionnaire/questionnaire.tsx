import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaireContext } from '../../contexts/questionnaire.context';
import { AnswerOption } from '../../hooks/archived-question-manager.hook';
import { Constants } from '../../libs/constants';
import { Button } from '../shared-ui/buttons/button';
import { BaseView } from '../shared-ui/layout/base-view';
import { Spinner } from '../shared-ui/spinner/spinner';
import { QuestionIllustration } from './question-illustration';

export const Questionnaire = () => {
    const { setupNewGame, currentQuestion, questionnaire, saveQuestionnaire, nextQuestion } = useQuestionnaireContext();
    const { scoreboard } = Constants.routes;
    const navigate = useNavigate();

    const [{ questionNum, purifiedQuestion, category }, setDisplayData] = useState({
        questionNum: 0,
        category: '',
        purifiedQuestion: ''
    });

    useEffect(() => {
        if (!currentQuestion) {
            (async () => setupNewGame())();
        }
    }, []);

    useEffect(() => {
        if (!currentQuestion) {
            return;
        }

        const { category, question, key } = currentQuestion;

        setDisplayData({
            category,
            purifiedQuestion: DOMPurify.sanitize(question),
            questionNum: key + 1
        });
    }, [currentQuestion]);

    if (!purifiedQuestion) {
        return <BaseView className={'display-flex justify-content-center'}>
            <Spinner/>
        </BaseView>;
    }

    const addAnsweredQuestion = (userAnswer: AnswerOption) => {
        const updatedQuestionnaire = questionnaire.map(question => {
            if (question.question === currentQuestion?.question) {
                return { ...currentQuestion, userAnswer };
            }

            return question;
        });

        saveQuestionnaire(updatedQuestionnaire);

        if (currentQuestion?.key === 9) {
            navigate(scoreboard.link);
            return;
        }

        nextQuestion();
    };

    return <BaseView>
        <div className={'col-3 display-flex justify-content-center align-items-start'}>
            <h2 data-testid="questionnaire" className={'fs-24 text-align-center fw--600 max-width-22'}>{category}</h2>
        </div>
        <div className={'col-2 display-flex justify-content-center align-items-start'}>
            <QuestionIllustration/>
        </div>
        <div className={'col-8 center'}>
            <div className={'max-width-22 p-6 br-16 border--light'}>
                <h3
                    className={'fs-20 text-align-center fw--400'}
                    dangerouslySetInnerHTML={{ __html: purifiedQuestion }}
                />
            </div>
        </div>
        <div className={'col-2 center'}>
            <h4 className={'fs-24 text-align-center fw--400 appear-smoothly'}>{questionNum} / 10</h4>
        </div>
        <div className={'col-4 display-flex align-items-end'}>
            <div className={'px-3 w-100 appear-smoothly'}>
                <Button buttonStyle={'false'} onClick={() => addAnsweredQuestion('False')} title={'False'}/>
            </div>
            <div className={'px-3 w-100 appear-smoothly'}>
                <Button buttonStyle={'true'} onClick={() => addAnsweredQuestion('True')} title={'True'}/>
            </div>
        </div>
    </BaseView>;
};
