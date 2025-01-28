import { describe, it, expect, vi, Mock } from 'vitest';
import postUserCloth from '../../../api/dashboard/postUserCloth';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('postUserCloth API', () => {
    it('should return response on successful post', async () => {
        const mockFormData = new FormData();
        mockFormData.append('file', new Blob(['file content'], { type: 'text/plain' }), 'test.txt');
        const mockResponse = { status: 200, data: { message: 'Success' } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await postUserCloth(mockFormData);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/clothes/', mockFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    it('should throw an error on post failure', async () => {
        const mockFormData = new FormData();
        mockFormData.append('file', new Blob(['file content'], { type: 'text/plain' }), 'test.txt');
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(postUserCloth(mockFormData)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/clothes/', mockFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });
});