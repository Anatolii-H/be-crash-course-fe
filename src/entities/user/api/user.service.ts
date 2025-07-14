import { httpClient } from '~/shared/api/http-client'

import type {
  TDisableUserDynamicKeys,
  TEnableUserDynamicKeys,
  TGetUsersRequestParams,
  TInviteUserPayload,
  TResendUserInviteDynamicKeys
} from '../model/user.types'

class UsersService {
  public getUsers(params: TGetUsersRequestParams) {
    return httpClient.get('/api/admin/users/', { params })
  }

  public disableUser(dynamicKeys: TDisableUserDynamicKeys) {
    return httpClient.post(
      '/api/admin/users/{userId}/disable/',
      {},
      {
        dynamicKeys
      }
    )
  }

  public enableUser(dynamicKeys: TEnableUserDynamicKeys) {
    return httpClient.post(
      '/api/admin/users/{userId}/enable/',
      {},
      {
        dynamicKeys
      }
    )
  }

  public inviteUser(body: TInviteUserPayload) {
    return httpClient.post('/api/admin/users/invite/', body)
  }

  public resendInvite(dynamicKeys: TResendUserInviteDynamicKeys) {
    return httpClient.post(
      '/api/admin/users/{userId}/resend-invite/',
      {},
      {
        dynamicKeys
      }
    )
  }
}

export const usersService = new UsersService()
