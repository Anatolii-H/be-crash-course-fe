import type { AxiosInstance, AxiosResponse } from 'axios'
import { appNotifications } from '../../lib/notifications.service'
import { authService } from '../../auth/auth.service'

const responseInterceptor = (response: AxiosResponse): Promise<AxiosResponse> => {
  if (response.config.returnOriginalRequest) {
    return Promise.resolve(response)
  } else {
    return response.data
  }
}

export const setupResponseInterceptor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.response.use(responseInterceptor, async error => {
    if (error.response?.config.ignoreErrorInterceptor) {
      return Promise.reject(error)
    }

    const status = error.response?.status

    if (status === 401) {
      appNotifications.show({ message: 'Session expired. Please login again.', type: 'error' })

      authService.logout()
    } else if (status === 500) {
      appNotifications.show({ message: 'Server error. Please try again later.', type: 'error' })
    } else {
      console.log('error')
      console.log('error', error)
      const message = error.message || 'Unexpected error'

      appNotifications.show({ message, type: 'error' })
    }

    return Promise.reject(error)
  })
}
