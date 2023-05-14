import Lottie from 'lottie-react';
import { spinnerLottie } from '../../../assets/lotties/spinner-lottie';

export interface SpinnerProps {
    onComplete?: () => void;
}

export const Spinner = (props: SpinnerProps) => {
    return <Lottie
        animationData={spinnerLottie}
        loop={true}
        autoplay={true}
        onComplete={props.onComplete}
    />;
};
