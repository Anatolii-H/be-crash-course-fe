import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { TGetPostsRequestParameters } from '../model/post.types'
import { postsService } from './post.service'

export const useGetPosts = (params: TGetPostsRequestParameters) => {
  return useQuery({
    queryKey: [
      '/api/posts/',
      params?.page,
      params?.pageSize,
      params?.sortBy,
      params?.sortOrder,
      params?.search,
      params?.minCommentsCount
    ],
    queryFn: () => postsService.getPosts(params),
    placeholderData: keepPreviousData
  })
}
