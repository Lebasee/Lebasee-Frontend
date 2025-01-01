import { describe, it, expect, vi, Mock } from 'vitest';
import baseApi from '../../../api/baseApi';
import VerifyCode from '../../../api/auth/verifyCode';

vi.mock('../../../api/baseApi');

describe('VerifyCode API', () => {
    it('should return response on successful verification', async () => {
        const verificationCode = '123456';
        const mockResponse = { status: 200, data: { message: 'Verification successful' } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await VerifyCode(verificationCode);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/verify_code/', { verification_code: verificationCode });
    });

    it('should throw an error on verification failure', async () => {
        const verificationCode = '123456';
        const mockError = { response: { status: 400, data: 'Invalid verification code' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(VerifyCode(verificationCode)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/verify_code/', { verification_code: verificationCode });
    });
});