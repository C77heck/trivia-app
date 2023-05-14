import Lottie from 'lottie-react';
import { questionLottie } from '../../assets/lotties/question-lottie';

export const QuestionIllustration = () => {
    return <Lottie
        animationData={questionLottie}
        loop={true}
        autoplay={true}
    />;
};
