import { describe, it, expect, vi, Mock } from 'vitest';
import { ResetPassword } from '../../../api/auth/resetPassword';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('ResetPassword API', () => {
    it('should return response on successful password reset', async () => {
        const mockRequest = { new_password: 'newpassword123', uid: 'user123', token: 'token123' };
        const mockResponse = { status: 200, data: 'Password reset successful' };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await ResetPassword(mockRequest);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/reset-password/', mockRequest);
    });

    it('should throw an error on password reset failure', async () => {
        const mockRequest = { new_password: 'newpassword123', uid: 'user123', token: 'token123' };
        const mockError = { response: { status: 400, data: 'Invalid token or user ID' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(ResetPassword(mockRequest)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/reset-password/', mockRequest);
    });
});