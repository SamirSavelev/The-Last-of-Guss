import { apiClient } from './axiosClient';
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  LogoutResponse,
} from './types/auth';

const PREFIX = '/api/v1/auth';

export const authApi = {
  async login(body: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(
      `${PREFIX}/login`,
      body
    );

    return data;
  },

  async me(): Promise<MeResponse> {
    const { data } = await apiClient.get<MeResponse>(`${PREFIX}/me`);

    return data;
  },

  async logout(): Promise<LogoutResponse> {
    const { data } = await apiClient.post<LogoutResponse>(`${PREFIX}/logout`);

    return data;
  },
};
