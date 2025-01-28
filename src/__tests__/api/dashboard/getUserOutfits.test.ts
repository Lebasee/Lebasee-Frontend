import { describe, it, expect, vi, Mock } from 'vitest';
import getUserOutfits from '../../../api/dashboard/getUserOutfits';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('getUserOutfits API', () => {
    it('should return outfits on successful fetch', async () => {
        const mockResponse = {
            data: {
                results: [
                    { id: 1, image: 'image1.jpg', caption: 'caption1', is_outfit: true },
                    { id: 2, image: 'image2.jpg', caption: 'caption2', is_outfit: false },
                    { id: 3, image: 'image3.jpg', caption: 'caption3', is_outfit: true },
                ],
                next: null,
            },
        };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const outfits = await getUserOutfits();

        expect(outfits).toEqual([
            { id: 1, image: 'image1.jpg', caption: 'caption1' },
            { id: 3, image: 'image3.jpg', caption: 'caption3' },
        ]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
    });

    it('should handle pagination and return all outfits', async () => {
        const mockResponsePage1 = {
            data: {
                results: [
                    { id: 1, image: 'image1.jpg', caption: 'caption1', is_outfit: true },
                    { id: 2, image: 'image2.jpg', caption: 'caption2', is_outfit: false },
                ],
                next: '/api/clothes/?page=2',
            },
        };

        const mockResponsePage2 = {
            data: {
                results: [
                    { id: 3, image: 'image3.jpg', caption: 'caption3', is_outfit: true },
                    { id: 4, image: 'image4.jpg', caption: 'caption4', is_outfit: true },
                ],
                next: null,
            },
        };

        (baseApi.get as Mock)
            .mockResolvedValueOnce(mockResponsePage1)
            .mockResolvedValueOnce(mockResponsePage2);

        const outfits = await getUserOutfits();

        expect(outfits).toEqual([
            { id: 1, image: 'image1.jpg', caption: 'caption1' },
            { id: 3, image: 'image3.jpg', caption: 'caption3' },
            { id: 4, image: 'image4.jpg', caption: 'caption4' },
        ]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/?page=2');
    });

    it('should throw an error on fetch failure', async () => {
        const mockError = { response: { status: 500, data: 'Internal Server Error' } };

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserOutfits()).rejects.toThrow();
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/');
    });
});