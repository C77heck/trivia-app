import { ButtonContent } from './button-content';
import './button.scss';

export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    buttonStyle?: 'submit' | 'link' | 'action' | 'outline' | 'full' | 'disabled';
    name?: string;
    id?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    title?: string | JSX.Element;
    isLoading?: boolean;
    textClass?: string;
    children?: any;
}

export const Button = (props: ButtonProps) => {
    return <button
        type={props.type || 'button'}
        className={`${getButtonType(props.buttonStyle || '')} ${props.className} center position-relative`}
        name={props.name}
        id={props.id}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        <ButtonContent
            isLoading={!!props.isLoading}
            content={props.children ? props.children : <span className={'color--light fs-17'}>{props.title}</span>}
        />
    </button>;
};

const getButtonType = (type: string) => {
    switch (type) {
        case 'submit':
            return 'button button--submit';
        case 'link':
            return 'button button--link';
        case 'action':
            return 'button button--action';
        case 'outline':
            return 'button button--outline';
        case 'full':
            return 'button button--full';
        case 'disabled':
            return 'button button--disabled';
        default:
            return 'button';
    }
};
