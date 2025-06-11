import axios from 'axios'

import { ENV } from '../config/env'
import { setupRequestInterceptor } from './interceptors/request.interceptor'
import { setupResponseInterceptor } from './interceptors/response.interceptor'

const httpClient = axios.create({
  baseURL: ENV.VITE_API_BASE_URL
})

setupRequestInterceptor(httpClient)
setupResponseInterceptor(httpClient)

export { httpClient }
