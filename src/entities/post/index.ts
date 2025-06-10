export { PostCard } from './ui/post-card'

export { useGetPosts } from './api/post.query'
export { postsService } from './api/post.service'

export type {
  TGetPostsRequestParameters,
  TGetPostsResponseItem,
  TGetPostsResponseItems,
  TGetPostsRequestParametersSortBy,
  TGetPostsRequestParametersSortOrder
} from './model/post.types'
