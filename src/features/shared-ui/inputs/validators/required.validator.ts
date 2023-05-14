import { ValidatorInterface } from '../input';

export const requiredValidator = (value: any): ValidatorInterface => {
    return { hasError: !value, errorMessage: 'Required' };
};
