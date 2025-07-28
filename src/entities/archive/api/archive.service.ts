import { httpClient } from '~/shared/api/http-client'
import type {
  TArchiveData,
  TArchiveEntities,
  TGetArchiveByIdDynamicKeys,
  TGetArchiveByIdResponse,
  TRestoreFromArchiveDynamicKeys
} from '../model/archive.types'

class ArchiveService {
  public restoreFromArchive(dynamicKeys: TRestoreFromArchiveDynamicKeys) {
    return httpClient.post('/api/admin/archive/{archiveId}/restore/', {}, { dynamicKeys })
  }

  public getArchivesByEntityType(entityType: TArchiveEntities) {
    return httpClient.get('/api/admin/archive/', {
      params: { entityType }
    })
  }

  public getArchiveById(dynamicKeys: TGetArchiveByIdDynamicKeys) {
    return httpClient.get('/api/admin/archive/{archiveId}/', { dynamicKeys }) as Promise<
      TGetArchiveByIdResponse & { data: TArchiveData }
    >
  }
}

export const archiveService = new ArchiveService()
