export interface SignInResponse {
  token: string;
  accountId: number;
  fullName: string;
  email: string;
  active: number;
}
export interface SignUpResponse {
  message: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  fullname: string;
  phoneNumber: number;
  email: string;
  password: string;
}

export enum AuthTypeForm {
  LOGIN = 'login',
  SSO = 'sso',
  FORGOT_PASSWORD = 'forgot_password',
}
