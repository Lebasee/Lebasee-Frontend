import { describe, it, expect, vi, Mock } from 'vitest';
import patchUserBodyInformation from '../../../api/dashboard/patchUserBodyInformation';
import baseApi from '../../../api/baseApi';

vi.mock('../../../api/baseApi');

describe('patchUserBodyInformation API', () => {
    it('should return updated body information on successful patch', async () => {
        const mockData = { id: 'height', newValue: 180 };
        const mockResponse = { data: { height: 180 } };

        (baseApi.patch as Mock).mockResolvedValue(mockResponse);

        const response = await patchUserBodyInformation(mockData);

        expect(response).toEqual([
            { name: "قد", id: "height", value: 180, type: "سانتی متر", min: 120, max: 210 },
            { name: "سن", id: "age", value: 20, type: "سال", min: 1, max: 100 },
            { name: "وزن", id: "weight", value: 90, type: "کیلوگرم", min: 30, max: 150 },
            { name: "عرض شانه", id: "shoulder_width", value: 50, type: "سانتی متر", min: 30, max: 80 },
            { name: "دور سینه", id: "chest_circumference", value: 50, type: "سانتی متر", min: 30, max: 100 },
            { name: "دور بازو", id: "arm_size", value: 20, type: "سانتی متر", min: 10, max: 80 }
        ]);
        expect(baseApi.patch).toHaveBeenCalledWith('/api/physical-attributes/', { height: 180 });
    });

    it('should throw an error on patch failure', async () => {
        const mockData = { id: 'height', newValue: 180 };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.patch as Mock).mockRejectedValue(mockError);

        await expect(patchUserBodyInformation(mockData)).rejects.toThrow();
        expect(baseApi.patch).toHaveBeenCalledWith('/api/physical-attributes/', { height: 180 });
    });
});