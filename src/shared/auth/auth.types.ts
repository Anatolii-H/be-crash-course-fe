export type TLoginPayload = {
  email: string
  password: string
}

export type TResetPasswordPayload = {
  email: string
}

export type TSignupPayload = TRequestBody<'/api/auth/signup/', 'post'>
