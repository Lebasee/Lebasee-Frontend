// Import necessary modules and functions from Vitest
import { describe, it, expect, vi, Mock } from 'vitest';
// Import the Login function from the auth API module
import { Login } from '../../../api/auth/login';
// Mock the baseApi module to isolate tests from actual API calls
import baseApi from '../../../api/baseApi';
// Import the User type for strong typing of user data
import { User } from '../../../types/types';

// Mock the baseApi module to prevent actual HTTP requests during tests
vi.mock('../../../api/baseApi');

// Define a test suite for the Login API
describe('Login API', () => {
  // Test case for a successful login scenario
  it('should return response on successful login', async () => {
    // Mock user input data for the login request
    const mockUser: User = { email: 'test@example.com', password: 'password' };
    // Mock API response for a successful login
    const mockResponse = { status: 200, data: { access: 'access_token', refresh: 'refresh_token' } };

    // Mock the baseApi.post function to return the mock response
    (baseApi.post as Mock).mockResolvedValue(mockResponse);

    // Call the Login function with the mock user data
    const response = await Login(mockUser);

    // Assert that the response matches the mocked API response
    expect(response).toEqual(mockResponse);
    // Verify that baseApi.post was called with the correct endpoint and user data
    expect(baseApi.post).toHaveBeenCalledWith('/api/login', mockUser);
  });

  // Test case for a failed login scenario
  it('should throw an error on login failure', async () => {
    // Mock user input data with incorrect password
    const mockUser: User = { email: 'test@example.com', password: 'wrongpassword' };
    // Mock API error response for a failed login
    const mockError = { response: { status: 401, data: 'Unauthorized' } };

    // Mock the baseApi.post function to reject with the mock error
    (baseApi.post as Mock).mockRejectedValue(mockError);

    // Assert that calling Login with incorrect credentials throws an error
    await expect(Login(mockUser)).rejects.toThrow();
    // Verify that baseApi.post was called with the correct endpoint and user data
    expect(baseApi.post).toHaveBeenCalledWith('/api/login', mockUser);
  });
});
