import { httpClient } from '~/shared/api/http-client'
import type {
  TCreateTagBody,
  TCreateTagResponsePayload,
  TDeleteTagDynamicKeys,
  TGetTagByIdDynamicKeys,
  TUpdateTagBody,
  TUpdateTagDynamicKeys
} from '../model/tag.types'

class TagsService {
  public createTag(payload: TCreateTagBody) {
    return httpClient.post('/api/admin/tags/', payload) as Promise<TCreateTagResponsePayload>
  }

  public getTagById(dynamicKeys: TGetTagByIdDynamicKeys) {
    return httpClient.get('/api/tags/{tagId}/', { dynamicKeys })
  }

  public getTags() {
    return httpClient.get('/api/tags/')
  }

  public deleteTag(dynamicKeys: TDeleteTagDynamicKeys): Promise<void> {
    return httpClient.delete('/api/admin/tags/{tagId}/', { dynamicKeys })
  }

  public updateTag(payload: TUpdateTagBody, dynamicKeys: TUpdateTagDynamicKeys) {
    return httpClient.patch('/api/admin/tags/{tagId}/', payload, { dynamicKeys })
  }
}

export const tagsService = new TagsService()
