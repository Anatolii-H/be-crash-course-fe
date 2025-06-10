export type TGetPostsRequestParameters = TRequestParameters<'/api/posts/', 'get'>['query']
export type TGetPostsRequestParametersSortBy = NonNullable<
  TRequestParameters<'/api/posts/', 'get'>['query']
>['sortBy']
export type TGetPostsRequestParametersSortOrder = NonNullable<
  TRequestParameters<'/api/posts/', 'get'>['query']
>['sortOrder']
export type TGetPostsResponseItems = TResponse<'/api/posts/', 'get'>
export type TGetPostsResponseItem = TResponse<'/api/posts/', 'get'>['data'][number]
