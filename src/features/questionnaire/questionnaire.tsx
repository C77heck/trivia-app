import DOMPurify from 'dompurify';
import { AnswerOption } from '../../hooks/archived-question-manager.hook';
import { useGameManager } from '../../hooks/game-manager.hook';
import { BaseView } from '../../screens/libs/base-view';
import { Button } from '../shared-ui/buttons/button';
import { Spinner } from '../shared-ui/spinner/spinner';
import { QuestionIllustration } from './question-illustration';

export const Questionnaire = () => {
    const { currentQuestion, addAnsweredQuestion } = useGameManager();

    if (!currentQuestion) {
        return <BaseView>
            <Spinner/>
        </BaseView>;
    }

    const { category, question, key } = currentQuestion;
    const questionNum = key + 1;
    const handleOnAnswer = (userAnswer: AnswerOption) => {
        addAnsweredQuestion({
            ...currentQuestion,
            userAnswer
        });
    };

    return <BaseView>
        <div className={'col-4 display-flex justify-content-center align-items-start'}>
            <h2 className={'fs-24 text-align-center fw--600 max-width-14'}>{category}</h2>
        </div>
        <div className={'col-4 display-flex justify-content-center align-items-start'}>
            <QuestionIllustration/>
        </div>
        <div className={'col-8 center'}>
            <h3
                className={'fs-20 text-align-center fw--400 max-width-22'}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question) }}
            />
        </div>
        <div className={'col-4 center'}>
            <h4 className={'fs-24 text-align-center fw--400'}>{questionNum} / 10</h4>
        </div>
        <div className={'col-4 center'}>
            <Button onClick={() => handleOnAnswer('False')} title={'False'}/>
            <Button onClick={() => handleOnAnswer('True')} title={'True'}/>
        </div>
    </BaseView>;
};
