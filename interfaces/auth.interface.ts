export interface SignInResponse {
  token: string;
  user: UserType;
}

export interface UserType {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roles: string;
  updatedAt: Date;
  isActivated: Boolean;
  createdAt: string;
  photo: string;

  __v: 0;
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
  LOGIN = "login",
  SSO = "sso",
  FORGOT_PASSWORD = "forgot_password",
}
