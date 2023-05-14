import Lottie from 'lottie-react';
import { questionLottie } from '../../assets/lotties/question-lottie';

export const QuestionIllustration = () => {
    return <div className={'w-100'}>
        <Lottie
            animationData={questionLottie}
            loop={true}
            autoplay={true}
        />
    </div>;
};
