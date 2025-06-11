import { signOut, signIn, fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth'

import type { TLoginPayload, TSignupPayload, TSignupResponse, TUserAttributes } from './auth.types'
import { httpClient } from '../api/http-client'

export const authService = (() => {
  const logout = async () => {
    await signOut()

    window.location.href = '/login'
  }

  const login = async (payload: TLoginPayload) => {
    return signIn({
      username: payload.email,
      password: payload.password
    })
  }

  const signup = async (
    payload: TSignupPayload,
    ignoreErrorInterceptor = false
  ): Promise<TSignupResponse> => {
    return httpClient.post('/api/auth/signup/', payload, {
      ignoreErrorInterceptor
    }) as Promise<TSignupResponse>
  }

  const getAccessToken = () => {
    return fetchAuthSession().then(session => session.tokens?.accessToken.toString())
  }

  const verifySession = async () => {
    const accessToken = await getAccessToken()

    return Boolean(accessToken)
  }

  const getUserAttributes = async (): Promise<TUserAttributes> => {
    const userAttributes = await fetchUserAttributes()

    return {
      email: userAttributes.email ?? '',
      sub: userAttributes.sub ?? ''
    }
  }

  return {
    logout,
    login,
    signup,
    getAccessToken,
    verifySession,
    getUserAttributes
  }
})()
