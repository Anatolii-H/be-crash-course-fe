import { httpClient } from '~/shared/api/http-client'

import type {
  TCreateCommentPayload,
  TCreateCommentDynamicKeys,
  TCreateCommentResponsePayload,
  TEditCommentPayload,
  TEditCommentDynamicKeys,
  TDeleteCommentDynamicKeys
} from '../model/comment.types'

class CommentsService {
  public createComment(body: TCreateCommentPayload, dynamicKeys: TCreateCommentDynamicKeys) {
    return httpClient.post('/api/posts/{postId}/comments/', body, {
      dynamicKeys
    }) as Promise<TCreateCommentResponsePayload>
  }

  public editComment(body: TEditCommentPayload, dynamicKeys: TEditCommentDynamicKeys) {
    return httpClient.patch('/api/comments/{commentId}/', body, {
      dynamicKeys
    })
  }

  public deleteComment(dynamicKeys: TDeleteCommentDynamicKeys) {
    return httpClient.delete('/api/comments/{commentId}/', {
      dynamicKeys
    })
  }
}

export const commentsService = new CommentsService()
