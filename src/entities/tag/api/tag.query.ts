import { useQuery } from '@tanstack/react-query'

import { tagsService } from './tag.service'

import type { TGetTagByIdDynamicKeys } from '../model/tag.types'

export const USE_GET_TAGS_QUERY_KEY = '/api/admin/tags'

export const useGetTagById = (dynamicKeys: TGetTagByIdDynamicKeys) => {
  return useQuery({
    queryKey: [dynamicKeys.tagId],
    queryFn: () => tagsService.getTagById(dynamicKeys)
  })
}

export const useGetTags = () => {
  return useQuery({
    queryKey: [USE_GET_TAGS_QUERY_KEY],
    queryFn: () => tagsService.getTags()
  })
}
