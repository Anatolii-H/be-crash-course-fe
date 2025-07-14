export type TGetUsersRequestParams = TRequestParameters<'/api/admin/users/', 'get'>['query']

export type TDisableUserDynamicKeys = TRequestParameters<
  '/api/admin/users/{userId}/disable/',
  'post'
>['path']

export type TEnableUserDynamicKeys = TRequestParameters<
  '/api/admin/users/{userId}/enable/',
  'post'
>['path']

export type TUsersReponse = TResponse<'/api/admin/users/', 'get'>
export type TUsersReponseItem = TResponse<'/api/admin/users/', 'get'>['data'][number]
export type TInviteUserPayload = TRequestBody<'/api/admin/users/invite/', 'post'>
export type TResendUserInviteDynamicKeys = TRequestParameters<
  '/api/admin/users/{userId}/resend-invite/',
  'post'
>['path']
