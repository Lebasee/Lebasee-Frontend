import { describe, it, expect, vi, Mock } from 'vitest';
import patchUserClothCaption from '../../../api/dashboard/patchUserClothCaption';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('patchUserClothCaption API', () => {
    it('should return response on successful patch', async () => {
        const mockData = { id: 1, caption: 'New Caption' };
        const mockResponse = { status: 200, data: { id: 1, caption: 'New Caption' } };

        (baseApi.patch as Mock).mockResolvedValue(mockResponse);

        const response = await patchUserClothCaption(mockData);

        expect(response).toEqual(mockResponse);
        expect(baseApi.patch).toHaveBeenCalledWith(`/api/clothes/${mockData.id}/`, { caption: mockData.caption });
    });

    it('should throw an error on patch failure', async () => {
        const mockData = { id: 1, caption: 'New Caption' };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.patch as Mock).mockRejectedValue(mockError);

        await expect(patchUserClothCaption(mockData)).rejects.toThrow();
        expect(baseApi.patch).toHaveBeenCalledWith(`/api/clothes/${mockData.id}/`, { caption: mockData.caption });
    });
});