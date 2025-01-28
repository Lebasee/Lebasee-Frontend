import { describe, it, expect, vi, Mock } from 'vitest';
import getUserInfo from '../../../api/dashboard/getUserInfo';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('getUserInfo API', () => {
    it('should return user info on successful request', async () => {
        const mockResponse = { status: 200, data: { id: 1, name: 'John Doe', email: 'john@example.com' } };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const response = await getUserInfo();

        expect(response).toEqual(mockResponse.data);
        expect(baseApi.get).toHaveBeenCalledWith('/api/users/profile/');
    });

    it('should throw an error on request failure', async () => {
        const mockError = { response: { status: 404, data: 'Not Found' } };

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserInfo()).rejects.toThrow();
        expect(baseApi.get).toHaveBeenCalledWith('/api/users/profile/');
    });
});