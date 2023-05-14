import { ValidatorInterface } from '../input';

export const passwordValidator = (value: string): ValidatorInterface => {
    const numericValue = /\d+/;
    const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const testLowerCase = /(?=.*[a-z])/;
    const testUpperCase = /(?=.*[A-Z])/;

    if (!value) {
        return { hasError: !value, errorMessage: 'required' };
    }

    if (value.length < 6) {
        return { hasError: true, errorMessage: 'min.length.not.sufficient' };
    }

    if (!numericValue.test(value)) {
        return { hasError: true, errorMessage: 'must.contain.numeric' };
    }

    if (!specialCharacter.test(value)) {
        return { hasError: true, errorMessage: 'must.contain.special.char' };
    }

    if (!testLowerCase.test(value)) {
        return { hasError: true, errorMessage: 'must.contain.lower.case' };
    }

    if (!testUpperCase.test(value)) {
        return { hasError: true, errorMessage: 'must.contain.uppercase' };
    }

    return { hasError: false, errorMessage: '' };

};
