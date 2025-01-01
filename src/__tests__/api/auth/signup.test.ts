import { describe, it, expect, vi, Mock } from 'vitest';
import baseApi from '../../../api/baseApi';
import { User } from '../../../types/types';
import Signup from '../../../api/auth/signUp';

vi.mock('../../../api/baseApi');

describe('Signup API', () => {
    it('should return response on successful signup', async () => {
        const mockUser: User = { email: 'test@example.com', password: 'password' };
        const mockResponse = { status: 201, data: { message: 'User created successfully' } };

        (baseApi.post as Mock).mockResolvedValue(mockResponse);

        const response = await Signup(mockUser);

        expect(response).toEqual(mockResponse);
        expect(baseApi.post).toHaveBeenCalledWith('/api/signup', mockUser);
    });

    it('should throw an error on signup failure', async () => {
        const mockUser: User = { email: 'test@example.com', password: 'password' };
        const mockError = { response: { status: 400, data: 'Bad Request' } };

        (baseApi.post as Mock).mockRejectedValue(mockError);

        await expect(Signup(mockUser)).rejects.toThrow();
        expect(baseApi.post).toHaveBeenCalledWith('/api/signup', mockUser);
    });
});