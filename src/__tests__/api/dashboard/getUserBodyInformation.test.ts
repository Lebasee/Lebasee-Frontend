import { describe, it, expect, vi, Mock } from 'vitest';
import getUserBodyInformation from '../../../api/dashboard/getUserBodyInformation';
import baseApi from '../../../api/baseApi';
import { BodyInformation } from '../../../types/types';

vi.mock('../../../api/baseApi');

describe('getUserBodyInformation API', () => {
    it('should return body information on successful API call', async () => {
        const mockResponse = {
            status: 200,
            data: {
                height: 180,
                age: 25,
                weight: 75,
                shoulder_width: 45,
                chest_circumference: 90,
                arm_size: 35,
            },
        };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const expectedData: BodyInformation[] = [
            { name: "قد", id: "height", value: 180, type: "سانتی متر", min: 120, max: 210 },
            { name: "سن", id: "age", value: 25, type: "سال", min: 1, max: 100 },
            { name: "وزن", id: "weight", value: 75, type: "کیلوگرم", min: 30, max: 150 },
            { name: "عرض شانه", id: "shoulder_width", value: 45, type: "سانتی متر", min: 30, max: 80 },
            { name: "دور سینه", id: "chest_circumference", value: 90, type: "سانتی متر", min: 30, max: 100 },
            { name: "دور بازو", id: "arm_size", value: 35, type: "سانتی متر", min: 10, max: 80 },
        ];

        const data = await getUserBodyInformation();

        expect(data).toEqual(expectedData);
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });

    it('should return default values when API response is missing fields', async () => {
        const mockResponse = {
            status: 200,
            data: {},
        };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const expectedData: BodyInformation[] = [
            { name: "قد", id: "height", value: 155, type: "سانتی متر", min: 120, max: 210 },
            { name: "سن", id: "age", value: 20, type: "سال", min: 1, max: 100 },
            { name: "وزن", id: "weight", value: 90, type: "کیلوگرم", min: 30, max: 150 },
            { name: "عرض شانه", id: "shoulder_width", value: 50, type: "سانتی متر", min: 30, max: 80 },
            { name: "دور سینه", id: "chest_circumference", value: 50, type: "سانتی متر", min: 30, max: 100 },
            { name: "دور بازو", id: "arm_size", value: 20, type: "سانتی متر", min: 10, max: 80 },
        ];

        const data = await getUserBodyInformation();

        expect(data).toEqual(expectedData);
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });

    it('should throw an error on API call failure', async () => {
        const mockError = new Error('Network Error');

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserBodyInformation()).rejects.toThrow('Network Error');
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });
});