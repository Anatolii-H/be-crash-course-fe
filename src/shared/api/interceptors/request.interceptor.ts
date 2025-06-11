import type { AxiosInstance } from 'axios'

import { authService } from '../../auth/auth.service'

export const setupRequestInterceptor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(async config => {
    try {
      const accessToken = await authService.getAccessToken()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    } catch {
      return config
    }
  })
}
