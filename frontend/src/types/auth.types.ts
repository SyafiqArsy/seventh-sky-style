export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface CurrentUser {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}