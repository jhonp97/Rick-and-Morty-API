import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Setear variable de entorno ANTES de importar el módulo
process.env.API_BASE_URL = 'https://rickandmortyapi.com/api';

// Importar después de setear la variable
const { fetchFromApi } = await import('../services/rickAndMortyService.js');

// Mock de fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('rickAndMortyService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchFromApi', () => {
    it('debe construir la URL correctamente sin params', async () => {
      // Arrange
      const mockResponse = { results: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      // Act
      const result = await fetchFromApi('character');

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character'
      );
      expect(result).toEqual(mockResponse);
    });

    it('debe construir la URL con query params', async () => {
      // Arrange
      const mockResponse = { results: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });
      const params = new URLSearchParams({ page: '2', name: 'Rick' });

      // Act
      await fetchFromApi('character', params);

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=2&name=Rick'
      );
    });

    it('debe lanzar error cuando la respuesta no es ok', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // Act & Assert
      await expect(fetchFromApi('character/99999')).rejects.toThrow(
        'Error 404 - Not Found'
      );
    });

    it('debe retornar JSON parseado cuando la respuesta es exitosa', async () => {
      // Arrange
      const mockCharacter = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      });

      // Act
      const result = await fetchFromApi('character/1');

      // Assert
      expect(result).toEqual(mockCharacter);
    });
  });
});
