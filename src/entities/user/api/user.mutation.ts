import { useMutation } from '@tanstack/react-query'

import { usersService } from './user.service'

import type {
  TDisableUserDynamicKeys,
  TEnableUserDynamicKeys,
  TInviteUserPayload,
  TResendUserInviteDynamicKeys
} from '../model/user.types'

export const useDisableUser = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TDisableUserDynamicKeys) => usersService.disableUser(dynamicKeys)
  })
}

export const useEnableUser = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TEnableUserDynamicKeys) => usersService.enableUser(dynamicKeys)
  })
}

export const useInviteUser = () => {
  return useMutation({
    mutationFn: (body: TInviteUserPayload) => usersService.inviteUser(body)
  })
}

export const useResendInvite = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TResendUserInviteDynamicKeys) =>
      usersService.resendInvite(dynamicKeys)
  })
}
