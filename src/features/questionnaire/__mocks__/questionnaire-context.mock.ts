export const mockContextValue = {
    getQuestionnaire: jest.fn(),
    clearQuestionnaire: jest.fn(),
    getScore: jest.fn(),
    setupNewGame: jest.fn(),
    currentQuestion: { category: 'category', question: 'question', key: 1 },
    questionnaire: [],
    saveQuestionnaire: jest.fn(),
    nextQuestion: jest.fn(),
};
