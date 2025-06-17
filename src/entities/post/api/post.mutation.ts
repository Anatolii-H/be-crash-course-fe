import { useMutation } from '@tanstack/react-query'
import { postsService } from './post.service'
import type {
  TCreatePostBody,
  TDeletePostDynamicKeys,
  TEditPostBody,
  TEditPostDynamicKeys
} from '../model/post.types'

type TEditPostVariables = {
  body: TEditPostBody
  dynamicKeys: TEditPostDynamicKeys
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: ({ postId }: TDeletePostDynamicKeys) => postsService.deletePost({ postId })
  })
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (body: TCreatePostBody) => postsService.createPost(body)
  })
}

export const useEditPost = () => {
  return useMutation({
    mutationFn: ({ body, dynamicKeys }: TEditPostVariables) => {
      return postsService.updatePost(body, dynamicKeys)
    }
  })
}
