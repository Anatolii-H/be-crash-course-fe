export type TCreateTagBody = TRequestBody<'/api/admin/tags/', 'post'>
export type TCreateTagResponsePayload =
  TApiPaths['/api/admin/tags/']['post']['responses']['201']['content']['application/json']

export type TUpdateTagBody = TRequestBody<'/api/admin/tags/{tagId}/', 'patch'>
export type TUpdateTagDynamicKeys = TRequestParameters<'/api/admin/tags/{tagId}/', 'patch'>['path']

export type TDeleteTagDynamicKeys = TRequestParameters<'/api/admin/tags/{tagId}/', 'delete'>['path']

export type TGetTagsResponsePayload = TResponse<'/api/tags/', 'get'>
export type TGetTagByIdResponsePayload = TResponse<'/api/tags/{tagId}/', 'get'>
export type TGetTagByIdDynamicKeys = TRequestParameters<'/api/tags/{tagId}/', 'get'>['path']
