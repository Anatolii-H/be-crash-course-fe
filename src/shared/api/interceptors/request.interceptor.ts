import type { AxiosInstance } from 'axios'

import { authService } from '../../auth/auth.service'
import { parseDynamicKeys } from '../../lib/general.service'

export const setupRequestInterceptor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(async config => {
    try {
      const accessToken = await authService.getAccessToken()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      if (config.url) {
        config.url = parseDynamicKeys(
          config.url,
          config.dynamicKeys as Record<string, string | number> | undefined
        )
      }

      return config
    } catch {
      return config
    }
  })
}
