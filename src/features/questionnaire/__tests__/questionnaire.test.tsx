import { cleanup, render, screen } from '@testing-library/react';
import { mockContextValue } from '../__mocks__/questionnaire-context.mock';
import { Questionnaire } from '../questionnaire';

jest.mock('../question-illustration', () => ({
    __esModule: true,
    QuestionIllustration: () => <div>QuestionIllustration</div>,
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({}),
}));

jest.mock('../../../contexts/questionnaire.context', () => ({
    useQuestionnaireContext: () => mockContextValue,
}));

jest.mock('../../shared-ui/spinner/spinner', () => ({
    __esModule: true,
    Spinner: () => <div>Spinner</div>,
}));

afterEach(() => cleanup());

test('questionnaire component test', () => {
    render(<Questionnaire/>);

    const element = screen.getByTestId('questionnaire');

    expect(element).toBeInTheDocument();
});
