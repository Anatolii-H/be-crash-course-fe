import axios from 'axios'

import { ENV } from '../config/env'

export const httpClient = axios.create({
  baseURL: ENV.VITE_API_BASE_URL
})
