import { describe, it, expect, vi, Mock } from 'vitest';
import getUserBodyInformationDashboard from '../../../api/dashboard/getUserBodyInformationDashboard';
import baseApi from '../../../api/baseApi';
import { BodyInformation } from '../../../types/types';
import { AxiosError } from 'axios';

vi.mock('../../../api/baseApi');

describe('getUserBodyInformationDashboard API', () => {
    it('should return body information on successful API call', async () => {
        const mockResponse = {
            data: {
                height: 175,
                age: 25,
                shoulder_width: 40,
                weight: 70
            }
        };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const expectedData: BodyInformation[] = [
            { name: "قد", id: "1", value: 175, type: "سانتی متر" },
            { name: "سن", id: "2", value: 25, type: "سال" },
            { name: "عرض شانه", id: "3", value: 40, type: "سانتی متر" },
            { name: "وزن", id: "4", value: 70, type: "کیلوگرم" }
        ];

        const response = await getUserBodyInformationDashboard();

        expect(response).toEqual(expectedData);
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });

    it('should return default values if API response is missing data', async () => {
        const mockResponse = { data: {} };

        (baseApi.get as Mock).mockResolvedValue(mockResponse);

        const expectedData = [
            { name: "قد", id: "1", value: "180", type: "سانتی متر" },
            { name: "سن", id: "2", value: "30", type: "سال" },
            { name: "عرض شانه", id: "3", value: "33", type: "سانتی متر" },
            { name: "وزن", id: "4", value: "60", type: "کیلوگرم" }
        ];

        const response = await getUserBodyInformationDashboard();

        expect(response).toEqual(expectedData);
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });

    it('should throw an error on API call failure', async () => {
        const mockError = new Error('Network Error') as AxiosError;

        (baseApi.get as Mock).mockRejectedValue(mockError);

        await expect(getUserBodyInformationDashboard()).rejects.toThrow('Network Error');
        expect(baseApi.get).toHaveBeenCalledWith('/api/physical-attributes/');
    });
});