import { ValidatorInterface } from '../input';

export const comparePassword = (valueToCompare: string) => {
    return (value: any): ValidatorInterface => {
        return { hasError: value !== valueToCompare, errorMessage: 'Passwords are not the same' };
    };
};
