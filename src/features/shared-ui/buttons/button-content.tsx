import React from 'react';
import { SpinnerIcon } from '../icons/icons';

export interface ButtonContentProps {
    content: JSX.Element | JSX.Element[] | any;
    isLoading?: boolean;
}

export const ButtonContent = (props: ButtonContentProps) => {
    return props.isLoading ? <SpinnerIcon className={'color--light'} width={15}/> : props.content;
};
