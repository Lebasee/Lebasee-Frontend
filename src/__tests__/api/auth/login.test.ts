import { describe, it, expect, vi, Mock } from 'vitest';
import { Login } from '../../../api/auth/login';
import baseApi from '../../../api/baseApi';
import { User } from '../../../types/types';

vi.mock('../../../api/baseApi');

describe('Login API', () => {
  it('should return response on successful login', async () => {
    const mockUser: User = { email: 'test@example.com', password: 'password' };
    const mockResponse = { status: 200, data: { access: 'access_token', refresh: 'refresh_token' } };

    (baseApi.post as Mock).mockResolvedValue(mockResponse);

    const response = await Login(mockUser);

    expect(response).toEqual(mockResponse);
    expect(baseApi.post).toHaveBeenCalledWith('/api/login', mockUser);
  });

  it('should throw an error on login failure', async () => {
    const mockUser: User = { email: 'test@example.com', password: 'wrongpassword' };
    const mockError = { response: { status: 401, data: 'Unauthorized' } };

    (baseApi.post as Mock).mockRejectedValue(mockError);

    await expect(Login(mockUser)).rejects.toThrow();
    expect(baseApi.post).toHaveBeenCalledWith('/api/login', mockUser);
  });
});