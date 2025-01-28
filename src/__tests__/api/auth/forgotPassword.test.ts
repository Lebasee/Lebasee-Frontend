import { describe, it, expect, vi, Mock } from 'vitest';
import { ForgotPassword } from '../../../api/auth/forgotPassword';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('ForgotPassword API', () => {
    it('should return response on successful request', async () => {
        const mockRequest = { email: 'test@example.com' };
        const mockResponse = { status: 200, data: { message: 'Password reset link sent' } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await ForgotPassword(mockRequest);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/forgot-password/', mockRequest);
    });

    it('should throw an error on request failure', async () => {
        const mockRequest = { email: 'test@example.com' };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(ForgotPassword(mockRequest)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/forgot-password/', mockRequest);
    });
});