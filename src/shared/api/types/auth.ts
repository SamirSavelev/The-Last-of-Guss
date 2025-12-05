export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: UserRole;
  token: string;
}

export interface MeResponse {
  username: string;
  role: UserRole;
}

export interface LogoutResponse {
  success: boolean;
}
