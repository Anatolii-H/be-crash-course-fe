import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { usersService } from './user.service'

import type { TGetUsersRequestParams } from '../model/user.types'

export const useGetUsers = (params: TGetUsersRequestParams) => {
  return useQuery({
    queryKey: ['/api/admin/users', params?.page, params?.pageSize, params?.search],
    queryFn: () => usersService.getUsers(params),
    placeholderData: keepPreviousData
  })
}
