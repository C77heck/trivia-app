import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeScreen } from '../home.screen';

afterEach(() => cleanup());

test('home screen component test', () => {
    render(<MemoryRouter>
        <HomeScreen/>
    </MemoryRouter>);

    const element = screen.getByTestId('home-screen');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Welcome to the Trivia Challenge');
});
