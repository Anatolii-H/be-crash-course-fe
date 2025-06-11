import type { ResourcesConfig } from 'aws-amplify'

import { ENV } from './env'

export const AMPLIFY_AUTH_CONFIG: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: ENV.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: ENV.VITE_COGNITO_USER_POOL_CLIENT_ID
  }
}
