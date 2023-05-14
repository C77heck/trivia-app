import { ChangeEvent, useEffect, useState } from 'react';
import { InputHandlerOptions } from '../../../hooks/form.hook';
import { Eyeicon } from '../icons/icons';
import { InputWrapper } from './input-wrapper';

export interface InputProps {
    inputHandler: ({ inputKey, value, isValid }: InputHandlerOptions) => void;
    value: string;
    name: string;
    label: string;
    className?: string;
    placeholder?: string;
    type?: 'text' | 'password';
    validators: ValidatorFunction[];
    validate?: boolean;
}

export interface ValidatorInterface {
    hasError: boolean;
    errorMessage: string;
}

export type ValidatorFunction = (value: string) => ValidatorInterface;

export const Input = (props: InputProps) => {
    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInFocus, setIsInFocus] = useState(true);
    const [type, setType] = useState(props?.type || 'text');

    const validate = (value: string): ValidatorInterface => {
        const hasErrors = !!props.validators && !!props.validators.length
            ? props.validators.map((validator: any) => validator(value)).filter((res: ValidatorInterface) => res.hasError)
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    };

    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const validationRes = validate(target.value);

        props.inputHandler({
            isValid: !validationRes.hasError,
            inputKey: props.name,
            value: target.value
        });

        setValue(target.value);
        setIsValid(!validationRes.hasError);
        setErrorMessage(validationRes.errorMessage);
    };

    useEffect(() => {
        if (props.validate) {
            const validationRes = validate(value);
            setIsInFocus(false);
            setIsValid(!validationRes.hasError);
            setErrorMessage(validationRes.errorMessage);
        }
    }, [props.validate]);

    return <InputWrapper
        label={props.label}
        name={props.name}
        hasError={!isValid}
        errorMessage={errorMessage}
        isInFocus={isInFocus}
    >
        <div className={'w-100 display-flex justify-content-space-between'}>
            <input
                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                onChange={handleOnChange}
                value={props.value}
                className={`${props?.className || ''}`}
                placeholder={props?.placeholder || ''}
                type={type}
            />
            {props.type === 'password'
                ? <Eyeicon
                    onClick={() => setType(type === 'text' ? 'password' : 'text')}
                    width={25}
                    className={`hover-opacity center pt-3 pr-4 ${type === 'text' ? 'color-dark-2' : ''}`}
                />
                : null}
        </div>

    </InputWrapper>;
};
