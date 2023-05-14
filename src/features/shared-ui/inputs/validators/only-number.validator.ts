import { ValidatorInterface } from '../input';

export const onlyNumberValidator = (value: any): ValidatorInterface => {
    if (!value) {
        return { hasError: true, errorMessage: 'Required' };
    }

    const hasOnlyNumbers = /^[0-9]*$/;

    return { hasError: !hasOnlyNumbers.test(value), errorMessage: 'only.numbers' };
};
