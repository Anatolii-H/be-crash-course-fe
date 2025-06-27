export { useCreatePost, useDeletePost, useEditPost } from './api/post.mutation'
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

export { PostCard } from './ui/post-card'
