import { cleanup, render, screen } from '@testing-library/react';
import IntersectionObserverMock from '../__mocks__/intersection-observer.mock';
import { AnswerResult } from '../answer-result';

beforeAll(() => {
    window.IntersectionObserver = IntersectionObserverMock;
});

afterEach(() => cleanup());

test('answer result component right test', () => {
    render(<AnswerResult delay={0} question={'question example 1'} isRight={true}/>);
    const element = screen.getByTestId('answer-result');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('question example 1');
    expect(element).toHaveTextContent('+');
});

test('answer result component false test', () => {
    render(<AnswerResult delay={0} question={'question example 2'} isRight={false}/>);
    const element = screen.getByTestId('answer-result');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('question example 2');
    expect(element).toHaveTextContent('-');
});
