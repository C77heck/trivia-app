import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { AnswerOption } from '../../hooks/archived-question-manager.hook';
import { useGameManager } from '../../hooks/game-manager.hook';
import { Constants } from '../../libs/constants';
import { BaseView } from '../../screens/libs/base-view';
import { Button } from '../shared-ui/buttons/button';
import { Spinner } from '../shared-ui/spinner/spinner';
import { QuestionIllustration } from './question-illustration';

export const Questionnaire = () => {
    const { currentQuestion, addAnsweredQuestion, setCurrentQuestion } = useGameManager();
    const { scoreboard } = Constants.routes;
    const navigate = useNavigate();

    if (!currentQuestion) {
        return <BaseView className={'justify-content-center'}>
            <Spinner/>
        </BaseView>;
    }

    const { category, question, key } = currentQuestion;
    const questionNum = key + 1;
    const handleOnAnswer = async (userAnswer: AnswerOption) => {
        addAnsweredQuestion({
            ...currentQuestion,
            userAnswer
        });

        if (currentQuestion.key === 9) {
            setCurrentQuestion(null);
            navigate(scoreboard.link);
        }
    };

    return <BaseView>
        <div className={'col-3 display-flex justify-content-center align-items-start'}>
            <h2 className={'fs-24 text-align-center fw--600 max-width-22'}>{category}</h2>
        </div>
        <div className={'col-2 display-flex justify-content-center align-items-start'}>
            <QuestionIllustration/>
        </div>
        <div className={'col-8 center'}>
            <div className={'max-width-22 p-6 br-16 border--light'}>
                <h3
                    className={'fs-20 text-align-center fw--400'}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question) }}
                />
            </div>
        </div>
        <div className={'col-2 center'}>
            <h4 className={'fs-24 text-align-center fw--400 appear-smoothly'}>{questionNum} / 10</h4>
        </div>
        <div className={'col-4 display-flex align-items-end'}>
            <div className={'px-3 w-100 appear-smoothly'}>
                <Button buttonStyle={'false'} onClick={() => handleOnAnswer('False')} title={'False'}/>
            </div>
            <div className={'px-3 w-100 appear-smoothly'}>
                <Button buttonStyle={'true'} onClick={() => handleOnAnswer('True')} title={'True'}/>
            </div>
        </div>
    </BaseView>;
};
