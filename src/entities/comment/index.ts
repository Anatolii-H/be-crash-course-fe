export { useCreateComment, useDeleteComment, useEditComment } from './api/comment.mutation'
export { commentsService } from './api/comment.service'

export type {
  TCreateCommentDynamicKeys,
  TCreateCommentPayload,
  TCreateCommentResponsePayload,
  TDeleteCommentDynamicKeys,
  TEditCommentDynamicKeys,
  TEditCommentPayload
} from './model/comment.types'
