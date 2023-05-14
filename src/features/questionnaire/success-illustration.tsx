import Lottie from 'lottie-react';
import { successLottie } from '../../assets/lotties/success-lottie';

export const SuccessIllustration = () => {
    return <div className={'w-100'}>
        <Lottie
            animationData={successLottie}
            loop={true}
            autoplay={true}
        />
    </div>;
};
