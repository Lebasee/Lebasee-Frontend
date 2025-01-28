import { describe, it, expect, vi, Mock } from 'vitest';
import getUserClothes from '../../../api/dashboard/getUserClothes';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('getUserClothes API', () => {
    it('should return clothes on successful fetch', async () => {
        const mockResponse = {
            data: {
                results: [
                    { id: 1, image: 'image1.jpg', caption: 'caption1', is_outfit: false },
                    { id: 2, image: 'image2.jpg', caption: 'caption2', is_outfit: true },
                ],
                next: null,
            },
        };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const clothes = await getUserClothes();

        expect(clothes).toEqual([{ id: 1, image: 'image1.jpg', caption: 'caption1' }]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
    });

    it('should fetch multiple pages of clothes', async () => {
        const mockResponsePage1 = {
            data: {
                results: [
                    { id: 1, image: 'image1.jpg', caption: 'caption1', is_outfit: false },
                    { id: 2, image: 'image2.jpg', caption: 'caption2', is_outfit: true },
                ],
                next: '/api/clothes/?page=2',
            },
        };

        const mockResponsePage2 = {
            data: {
                results: [
                    { id: 3, image: 'image3.jpg', caption: 'caption3', is_outfit: false },
                ],
                next: null,
            },
        };

        (baseApi.get as Mock)
            .mockResolvedValueOnce(mockResponsePage1)
            .mockResolvedValueOnce(mockResponsePage2);

        const clothes = await getUserClothes();

        expect(clothes).toEqual([
            { id: 1, image: 'image1.jpg', caption: 'caption1' },
            { id: 3, image: 'image3.jpg', caption: 'caption3' },
        ]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/?page=2');
    });

    it('should throw an error on fetch failure', async () => {
        const mockError = { response: { status: 500, data: 'Internal Server Error' } };

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserClothes()).rejects.toThrow();
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
    });
});