export { useCreateTag, useDeleteTag, useUpdateTag } from './api/tag.mutation'
export { USE_GET_TAGS_QUERY_KEY, useGetTagById, useGetTags } from './api/tag.query'
export { tagsService } from './api/tag.service'

export type {
  TCreateTagBody,
  TCreateTagResponsePayload,
  TDeleteTagDynamicKeys,
  TGetTagByIdDynamicKeys,
  TGetTagByIdResponsePayload,
  TGetTagsResponsePayload,
  TUpdateTagBody,
  TUpdateTagDynamicKeys
} from './model/tag.types'
