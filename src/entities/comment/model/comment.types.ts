export type TCreateCommentPayload = TRequestBody<'/api/posts/{postId}/comments/', 'post'>
export type TCreateCommentDynamicKeys = TRequestParameters<
  '/api/posts/{postId}/comments/',
  'post'
>['path']
export type TCreateCommentResponsePayload =
  TApiPaths['/api/posts/{postId}/comments/']['post']['responses']['201']['content']['application/json']

export type TEditCommentPayload = TRequestBody<'/api/comments/{commentId}/', 'patch'>
export type TEditCommentDynamicKeys = TRequestParameters<
  '/api/comments/{commentId}/',
  'patch'
>['path']
export type TDeleteCommentDynamicKeys = TRequestParameters<
  '/api/comments/{commentId}/',
  'delete'
>['path']
