import { httpClient } from '~/shared/api/http-client'
import type { TGetPostsRequestParameters } from '../model/post.types'

class PostsService {
  public createPost() {}

  public getPosts(params: TGetPostsRequestParameters) {
    return httpClient.get('/api/posts/', {
      params
    })
  }
}

export const postsService = new PostsService()
