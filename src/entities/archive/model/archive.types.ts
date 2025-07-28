export type TRestoreFromArchiveDynamicKeys = TRequestParameters<
  '/api/admin/archive/{archiveId}/restore/',
  'post'
>['path']
export type TArchiveEntities = TRequestParameters<
  '/api/admin/archive/',
  'get'
>['query']['entityType']
export type TGetArchiveByIdDynamicKeys = TRequestParameters<
  '/api/admin/archive/{archiveId}/',
  'get'
>['path']
export type TGetArchivesResponse = TResponse<'/api/admin/archive/', 'get'>
export type TGetArchiveByIdResponse = TResponse<'/api/admin/archive/{archiveId}/', 'get'>
export type TArchiveData = {
  user: TResponse<'/api/admin/users/', 'get'>['data'][number]
  posts: TResponse<'/api/posts/', 'get'>['data'][number]
  comments: TResponse<'/api/posts/{postId}/comments/', 'get'>
}
