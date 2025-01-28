import { describe, it, expect, vi, Mock } from 'vitest';
import getUserTryons from '../../../api/dashboard/getUserTryons';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('getUserTryons API', () => {
    it('should return an array of ClothType on successful fetch', async () => {
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

        const result = await getUserTryons();

        expect(result).toEqual([
            { id: 1, image: 'image1.jpg', caption: 'caption1' },
            { id: 3, image: 'image3.jpg', caption: 'caption3' },
        ]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/tryon-logs/');
    });

    it('should handle pagination and return all ClothType items', async () => {
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

        const result = await getUserTryons();

        expect(result).toEqual([
            { id: 1, image: 'image1.jpg', caption: 'caption1' },
            { id: 3, image: 'image3.jpg', caption: 'caption3' },
            { id: 4, image: 'image4.jpg', caption: 'caption4' },
        ]);
        expect(baseApi.get).toHaveBeenCalledWith('/api/tryon-logs/');
        expect(baseApi.get).toHaveBeenCalledWith('/api/clothes/?page=2');
    });

    it('should throw an error on fetch failure', async () => {
        const mockError = { response: { status: 500, data: 'Internal Server Error' } };

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserTryons()).rejects.toThrow();
        expect(baseApi.get).toHaveBeenCalledWith('/api/tryon-logs/');
    });
});