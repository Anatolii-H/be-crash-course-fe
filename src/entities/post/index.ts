export { PostCard } from './ui/post-card'

export { useGetPosts, useGetPost } from './api/post.query'
export { postsService } from './api/post.service'

export type {
  TGetPostsRequestParameters,
  TGetPostsResponseItem,
  TGetPostsResponseItems,
  TGetPostsRequestParametersSortBy,
  TGetPostsRequestParametersSortOrder,
  TGetPostByIdDynamicKeys
} from './model/post.types'
