import React from 'react';
import { Children } from '../../../contexts/auth.context';
import { LangKey, useTranslateContext } from '../../../contexts/translate.context';

interface NormalWrapperProps {
    hasError: boolean;
    errorMessage: string;
    label: string;
    name: string;
    children: Children;
    isInFocus: boolean;
}

export const InputWrapper = (props: NormalWrapperProps) => {
    const { trans } = useTranslateContext();
    const errorClass = `error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--div`;
    const wrapperClasses = `center input-wrapper cursor-pointer ${errorClass}`;
    const error = trans((props?.errorMessage || '') as LangKey);

    return <div className={`display-flex flex-column w-100`}>
        {props.label && <label
            className={`input-label error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--label`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}
        <div className={wrapperClasses}>
            {props.children}
        </div>
        {!!props.hasError && !props.isInFocus && <small className={'error-show fs-12'}>{error}</small>}
    </div>;
};
