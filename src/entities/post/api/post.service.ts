import { httpClient } from '~/shared/api/http-client'

import type {
  TGetPostsRequestParameters,
  TGetPostByIdDynamicKeys,
  TDeletePostDynamicKeys,
  TCreatePostBody,
  TEditPostBody,
  TEditPostDynamicKeys
} from '../model/post.types'

class PostsService {
  public getPosts(params: TGetPostsRequestParameters) {
    return httpClient.get('/api/posts/', {
      params
    })
  }

  public getPostById({ postId }: TGetPostByIdDynamicKeys) {
    return httpClient.get('/api/posts/{postId}/', {
      dynamicKeys: {
        postId
      }
    })
  }

  public deletePost({ postId }: TDeletePostDynamicKeys) {
    return httpClient.delete('/api/posts/{postId}/', {
      dynamicKeys: { postId }
    })
  }

  public createPost(body: TCreatePostBody) {
    return httpClient.post('/api/posts/', body)
  }

  public updatePost(body: TEditPostBody, dynamicKeys: TEditPostDynamicKeys) {
    return httpClient.patch('/api/posts/{postId}/', body, {
      dynamicKeys
    })
  }
}

export const postsService = new PostsService()
