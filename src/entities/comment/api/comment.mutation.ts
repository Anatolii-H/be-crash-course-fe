import { useMutation } from '@tanstack/react-query'

import type {
  TCreateCommentPayload,
  TCreateCommentDynamicKeys,
  TEditCommentPayload,
  TEditCommentDynamicKeys,
  TDeleteCommentDynamicKeys
} from '../model/comment.types'
import { commentsService } from './comment.service'

type TCreateCommentVariables = {
  body: TCreateCommentPayload
  dynamicKeys: TCreateCommentDynamicKeys
}

type TEditCommentVariables = {
  body: TEditCommentPayload
  dynamicKeys: TEditCommentDynamicKeys
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: ({ body, dynamicKeys }: TCreateCommentVariables) => {
      return commentsService.createComment(body, dynamicKeys)
    }
  })
}

export const useEditComment = () => {
  return useMutation({
    mutationFn: ({ body, dynamicKeys }: TEditCommentVariables) => {
      return commentsService.editComment(body, dynamicKeys)
    }
  })
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TDeleteCommentDynamicKeys) => {
      return commentsService.deleteComment(dynamicKeys)
    }
  })
}
