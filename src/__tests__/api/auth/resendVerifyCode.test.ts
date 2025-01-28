import { describe, it, expect, vi, Mock } from 'vitest';
import resendVerifyCode from '../../../api/auth/resendVerifyCode';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('resendVerifyCode API', () => {
    it('should return response on successful code resend', async () => {
        const mockEmail = 'test@example.com';
        const mockResponse = { status: 200, data: { message: 'Code sent successfully' } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await resendVerifyCode(mockEmail);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/send_code/', { email: mockEmail });
    });

    it('should throw an error on code resend failure', async () => {
        const mockEmail = 'test@example.com';
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(resendVerifyCode(mockEmail)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/send_code/', { email: mockEmail });
    });
});