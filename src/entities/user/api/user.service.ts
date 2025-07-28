import { httpClient } from '~/shared/api/http-client'

import type {
  TDisableUserDynamicKeys,
  TEnableUserDynamicKeys,
  TGetUsersRequestParams,
  THardDeleteDynamicKeys,
  TInviteUserPayload,
  TResendUserInviteDynamicKeys,
  TSoftDeleteDynamicKeys,
  TSoftRestoreDynamicKeys
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

  public softDelete(dynamicKeys: TSoftDeleteDynamicKeys) {
    return httpClient.post(
      '/api/admin/users/{userId}/soft-delete/',
      {},
      {
        dynamicKeys
      }
    )
  }

  public softRestore(dynamicKeys: TSoftRestoreDynamicKeys) {
    return httpClient.post('/api/admin/users/{userId}/soft-restore/', {}, { dynamicKeys })
  }

  public hardDelete(dynamicKeys: THardDeleteDynamicKeys) {
    return httpClient.delete('/api/admin/users/{userId}/', { dynamicKeys })
  }
}

export const usersService = new UsersService()
