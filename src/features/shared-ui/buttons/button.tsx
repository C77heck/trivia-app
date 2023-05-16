import './button.scss';

export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    buttonStyle?: 'false' | 'true' | 'link';
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
        {props.children ? props.children : <span className={'color-light-1 fs-17'}>{props.title}</span>}
    </button>;
};

const getButtonType = (type: string) => {
    switch (type) {
        case 'true':
            return 'button button--true';
        case 'false':
            return 'button button--false';
        case 'link':
            return 'button button--link';
        default:
            return 'button';
    }
};
