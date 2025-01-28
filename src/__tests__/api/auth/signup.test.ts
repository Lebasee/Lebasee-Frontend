// Import necessary modules and functions from Vitest
import { describe, it, expect, vi, Mock } from 'vitest';
// Import the baseApi module to mock the API requests
import baseApi from '../../../api/baseApi';
// Import the User type for strong typing of user data
import { User } from '../../../types/types';
// Import the Signup function from the auth API module
import Signup from '../../../api/auth/signUp';

// Mock the baseApi module to prevent actual HTTP requests during tests
vi.mock('../../../api/baseApi');

// Define a test suite for the Signup API
describe('Signup API', () => {
  // Test case for a successful signup scenario
  it('should return response on successful signup', async () => {
    // Mock user input data for the signup request
    const mockUser: User = { email: 'test@example.com', password: 'password' };
    // Mock API response for a successful signup
    const mockResponse = { status: 201, data: { message: 'User created successfully' } };

    // Mock the baseApi.post function to return the mock response
    (baseApi.post as Mock).mockResolvedValue(mockResponse);

    // Call the Signup function with the mock user data
    const response = await Signup(mockUser);

    // Assert that the response matches the mocked API response
    expect(response).toEqual(mockResponse);
    // Verify that baseApi.post was called with the correct endpoint and user data
    expect(baseApi.post).toHaveBeenCalledWith('/api/signup', mockUser);
  });

  // Test case for a failed signup scenario
  it('should throw an error on signup failure', async () => {
    // Mock user input data for the signup request
    const mockUser: User = { email: 'test@example.com', password: 'password' };
    // Mock API error response for a failed signup
    const mockError = { response: { status: 400, data: 'Bad Request' } };

    // Mock the baseApi.post function to reject with the mock error
    (baseApi.post as Mock).mockRejectedValue(mockError);

    // Assert that calling Signup with the mock user data throws an error
    await expect(Signup(mockUser)).rejects.toThrow();
    // Verify that baseApi.post was called with the correct endpoint and user data
    expect(baseApi.post).toHaveBeenCalledWith('/api/signup', mockUser);
  });
});
