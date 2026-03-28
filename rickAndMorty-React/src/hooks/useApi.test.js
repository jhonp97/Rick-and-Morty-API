import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar estado inicial cuando url es null', () => {
    // Arrange & Act
    const { result } = renderHook(() => useApi(null));

    // Assert
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.info).toEqual({ count: 0, pages: 0 });
  });

  it('debe hacer fetch y retornar datos paginados', async () => {
    // Arrange
    const mockResponse = {
      results: [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
      ],
      info: { count: 2, pages: 1 },
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const { result } = renderHook(() => useApi('https://api.example.com/characters'));

    // Assert - loading state
    expect(result.current.loading).toBe(true);

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.data).toEqual(mockResponse.results);
    expect(result.current.info).toEqual(mockResponse.info);
    expect(result.current.error).toBe(null);
  });

  it('debe hacer fetch y retornar un objeto single', async () => {
    // Arrange
    const mockCharacter = { id: 1, name: 'Rick Sanchez', status: 'Alive' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharacter),
    });

    // Act
    const { result } = renderHook(() => useApi('https://api.example.com/character/1'));

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    // Assert
    expect(result.current.data).toEqual(mockCharacter);
    expect(result.current.error).toBe(null);
  });

  it('debe manejar errores de fetch', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    // Act
    const { result } = renderHook(() => useApi('https://api.example.com/notfound'));

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    // Assert
    expect(result.current.error).toBe('Error 404 - Not Found');
    expect(result.current.data).toEqual([]);
  });

  it('debe cancelar fetch cuando el componente se desmonta', async () => {
    // Arrange
    let abortCalled = false;
    const mockAbort = vi.fn(() => {
      abortCalled = true;
    });
    global.fetch.mockImplementationOnce(() => {
      return new Promise(() => {}); // Never resolves
    });

    // Act
    const { unmount } = renderHook(() => useApi('https://api.example.com/characters'));
    
    // Unmount before fetch completes
    unmount();

    // Assert - fetch should have been called with AbortController signal
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/characters',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });
});
