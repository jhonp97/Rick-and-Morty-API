import '@testing-library/jest-dom';

// Mock de fetch global para tests
global.fetch = vi.fn();

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
});
