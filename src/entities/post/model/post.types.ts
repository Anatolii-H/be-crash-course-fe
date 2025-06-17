export type TGetPostsRequestParameters = TRequestParameters<'/api/posts/', 'get'>['query']
export type TGetPostsRequestParametersSortBy = NonNullable<
  TRequestParameters<'/api/posts/', 'get'>['query']
>['sortBy']
export type TGetPostsRequestParametersSortOrder = NonNullable<
  TRequestParameters<'/api/posts/', 'get'>['query']
>['sortOrder']
export type TGetPostsResponseItems = TResponse<'/api/posts/', 'get'>
export type TGetPostsResponseItem = TResponse<'/api/posts/', 'get'>['data'][number]

export type TGetPostByIdDynamicKeys = TRequestParameters<'/api/posts/{postId}/', 'get'>['path']
export type TDeletePostDynamicKeys = TRequestParameters<'/api/posts/{postId}/', 'delete'>['path']
export type TCreatePostBody = TRequestBody<'/api/posts/', 'post'>
export type TEditPostBody = TRequestBody<'/api/posts/{postId}/', 'patch'>
export type TEditPostDynamicKeys = TRequestParameters<'/api/posts/{postId}/', 'patch'>['path']
