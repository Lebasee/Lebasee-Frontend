import { describe, it, expect, vi, Mock } from 'vitest';
import deleteUserCloth from '../../../api/dashboard/deleteUserCloth';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('deleteUserCloth API', () => {
    it('should return response on successful deletion', async () => {
        const mockId = 1;
        const mockResponse = { status: 200, data: 'Deleted successfully' };

        (baseApi.delete as Mock).mockResolvedValue(mockResponse);

        const response = await deleteUserCloth(mockId);

        expect(response).toEqual(mockResponse);
        expect(baseApi.delete).toHaveBeenCalledWith(`/api/clothes/${mockId}/`);
    });

    it('should throw an error on deletion failure', async () => {
        const mockId = 1;
        const mockError = { response: { status: 404, data: 'Not Found' } };

        (baseApi.delete as Mock).mockRejectedValue(mockError);

        await expect(deleteUserCloth(mockId)).rejects.toThrow();
        expect(baseApi.delete).toHaveBeenCalledWith(`/api/clothes/${mockId}/`);
    });
});