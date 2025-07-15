import { useMutation } from '@tanstack/react-query'
import type {
  TCreateTagBody,
  TDeleteTagDynamicKeys,
  TUpdateTagBody,
  TUpdateTagDynamicKeys
} from '../model/tag.types'
import { tagsService } from './tag.service'

type TEditTagVariables = {
  body: TUpdateTagBody
  dynamicKeys: TUpdateTagDynamicKeys
}

export const useDeleteTag = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TDeleteTagDynamicKeys) => tagsService.deleteTag(dynamicKeys)
  })
}

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (payload: TCreateTagBody) => tagsService.createTag(payload)
  })
}

export const useUpdateTag = () => {
  return useMutation({
    mutationFn: ({ body, dynamicKeys }: TEditTagVariables) =>
      tagsService.updateTag(body, dynamicKeys)
  })
}
