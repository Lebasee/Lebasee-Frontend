// Import necessary modules and functions from Vitest
import { describe, it, expect, vi, Mock } from 'vitest';
// Import the baseApi module to mock the API requests
import baseApi from '../../../api/baseApi';
// Import the VerifyCode function from the auth API module
import VerifyCode from '../../../api/auth/verifyCode';

// Mock the baseApi module to prevent actual HTTP requests during tests
vi.mock('../../../api/baseApi');

// Define a test suite for the VerifyCode API
describe('VerifyCode API', () => {
  // Test case for a successful verification scenario
  it('should return response on successful verification', async () => {
    // Mock verification code input
    const verificationCode = '123456';
    // Mock API response for a successful verification
    const mockResponse = { status: 200, data: { message: 'Verification successful' } };

    // Mock the baseApi.post function to return the mock response
    (baseApi.post as Mock).mockResolvedValue(mockResponse);

    // Call the VerifyCode function with the mock verification code
    const response = await VerifyCode(verificationCode);

    // Assert that the response matches the mocked API response
    expect(response).toEqual(mockResponse);
    // Verify that baseApi.post was called with the correct endpoint and verification code
    expect(baseApi.post).toHaveBeenCalledWith('/api/auth/verify_code/', { verification_code: verificationCode });
  });

  // Test case for a failed verification scenario
  it('should throw an error on verification failure', async () => {
    // Mock verification code input
    const verificationCode = '123456';
    // Mock API error response for a failed verification
    const mockError = { response: { status: 400, data: 'Invalid verification code' } };

    // Mock the baseApi.post function to reject with the mock error
    (baseApi.post as Mock).mockRejectedValue(mockError);

    // Assert that calling VerifyCode with the mock verification code throws an error
    await expect(VerifyCode(verificationCode)).rejects.toThrow();
    // Verify that baseApi.post was called with the correct endpoint and verification code
    expect(baseApi.post).toHaveBeenCalledWith('/api/auth/verify_code/', { verification_code: verificationCode });
  });
});
