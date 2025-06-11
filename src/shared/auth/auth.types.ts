export type TLoginPayload = {
  email: string
  password: string
}

export type TResetPasswordPayload = {
  email: string
  password: string
  confirmationCode: string
}

export type TUserAttributes = {
  sub: string
  email: string
}

export type TSignupPayload = TRequestBody<'/api/auth/signup/', 'post'>
export type TUserProfile = TResponse<'/api/user/', 'get'>
export type TSignupResponse =
  TApiPaths['/api/auth/signup/']['post']['responses']['201']['content']['application/json']
