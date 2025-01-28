import { describe, it, expect, vi, Mock } from 'vitest';
import postUserNewPassword from '../../../api/dashboard/postUserNewPassword';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('postUserNewPassword API', () => {
    it('should return response on successful password change', async () => {
        const mockData = { new_password: 'newpassword', current_password: 'currentpassword' };
        const mockResponse = { status: 200, data: 'Password changed successfully' };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await postUserNewPassword(mockData);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/users/set_password/', mockData);
    });

    it('should throw an error on password change failure', async () => {
        const mockData = { new_password: 'newpassword', current_password: 'wrongpassword' };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(postUserNewPassword(mockData)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/auth/users/set_password/', mockData);
    });
});