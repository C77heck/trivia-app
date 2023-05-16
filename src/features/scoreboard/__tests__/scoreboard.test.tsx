import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IntersectionObserverMock from '../__mocks__/intersection-observer.mock';
import { Scoreboard } from '../scoreboard';

beforeAll(() => {
    window.IntersectionObserver = IntersectionObserverMock;
});

afterEach(() => cleanup());

test('scoreboard component test', () => {
    render(<MemoryRouter>
        <Scoreboard/>
    </MemoryRouter>);

    const element = screen.getByTestId('scoreboard');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('score');
});

test('scoreboard button onclick event test', () => {
    render(<MemoryRouter>
        <Scoreboard/>
    </MemoryRouter>);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/');
});
