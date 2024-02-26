import { RequestAdapter } from './request-adapter.service';
import { LoginRequestBody, RegisterRequestBody, SignInResponse, SignUpResponse } from '@/interfaces/auth.interface';
import { BaseResponse } from '@/interfaces/global.interface';

export class AuthService extends RequestAdapter {
  constructor() {
    super();
  }

  public async login(body: LoginRequestBody): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<LoginRequestBody, BaseResponse<SignInResponse>>('/login', body);

      if (data?.data?.token) {
        localStorage.setItem('token', data?.data?.token);
        localStorage.setItem('user', JSON.stringify(body));
      }

      return data?.data?.token || '';
    } catch (error) {
      throw error;
    }
  }

  public async register(body: RegisterRequestBody): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<RegisterRequestBody, BaseResponse<SignUpResponse>>('/register', body);

      return data?.data?.message || '';
    } catch (error) {
      throw error;
    }
  }

  public async forgotPassword(email: string): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<string, BaseResponse<string>>('/forgot-password', email);

      return data?.data || '';
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  public async resetPassword(body: { password: string; token: string }): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<{ password: string; token: string }, BaseResponse<string>>('/reset-password', body);

      return data?.data || '';
    } catch (error) {
      throw error;
    }
  }
}
