import { describe, it, expect, vi, Mock } from 'vitest';
import putUserName from '../../../api/dashboard/putUserName';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('putUserName API', () => {
    it('should return response on successful request', async () => {
        const mockData = new FormData();
        mockData.append('username', 'newUsername');
        const mockResponse = { status: 200, data: { message: 'Username updated successfully' } };

        (baseApi.put as Mock).mockResolvedValue(mockResponse);

        const response = await putUserName(mockData);

        expect(response).toEqual(mockResponse);
        expect(baseApi.put).toHaveBeenCalledWith('/api/users/profile/', mockData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    it('should throw an error on request failure', async () => {
        const mockData = new FormData();
        mockData.append('username', 'newUsername');
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.put as Mock).mockRejectedValue(mockError);

        await expect(putUserName(mockData)).rejects.toThrow();
        expect(baseApi.put).toHaveBeenCalledWith('/api/users/profile/', mockData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });
});