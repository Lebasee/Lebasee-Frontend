import { describe, it, expect, vi, Mock } from 'vitest';
import { tryon } from '../../../api/home/tryon';
import baseApi from '../../../api/baseApi';
import { generatedImage } from '../../../types/types';

vi.mock('../../../api/baseApi');

describe('Tryon API', () => {
    it('should return image URL on successful tryon', async () => {
        const mockData: generatedImage = { human_image_url:	'image_data', garment_image_url:'image_data' };
        const mockResponse = { status: 200, data: { image: { url: 'http://example.com/image.jpg' } } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await tryon(mockData);

        expect(response).toEqual(mockResponse.data.image.url);
        expect(baseApi.post).toHaveBeenCalledWith('/api/tryon', mockData);
    });

    it('should throw an error on tryon failure', async () => {
        const mockData: generatedImage = { human_image_url:	'image_data', garment_image_url:'image_data' };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(tryon(mockData)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/tryon', mockData);
    });
});