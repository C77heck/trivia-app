import DOMPurify from 'dompurify';
import { useIntersectionAnimator } from '../../hooks/animate-hook';
import { manageLongText } from '../../libs/text-formatter';

export interface AnswerResultProps {
    isRight: boolean;
    question: string;
    delay: number;
}

export const AnswerResult = ({ isRight, question, delay }: AnswerResultProps) => {
    const icon = isRight ? '+' : '-';
    const colourClass = isRight ? 'color-success-1' : 'color-failure-1';
    const { isAnimated, setRef } = useIntersectionAnimator<Element | null>({ delay });

    return <div
        data-testid={'answer-result'}
        ref={ref => setRef(ref)}
        className={`${isAnimated ? 'appear-smoothly' : 'scale-0'} display-flex py-1 align-items-start`}
    >
        <div className={'px-2'}>
            <span className={`${colourClass} fs-30 fw--800 lh-21`}>{icon}</span>
        </div>

        <span
            className={`${colourClass} fs-20 text-align-left lh-26 pr-2`}
            dangerouslySetInnerHTML={{ __html: manageLongText(DOMPurify.sanitize(question), 80) }}
        />
    </div>;
};
