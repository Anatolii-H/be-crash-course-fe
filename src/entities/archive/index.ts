export { useRestoreFromArchive } from './api/archive.mutation'
export { useArchiveById, useArchivesByEntityType } from './api/archive.query'
export { archiveService } from './api/archive.service'

export type {
  TArchiveData,
  TArchiveEntities,
  TGetArchiveByIdDynamicKeys,
  TGetArchiveByIdResponse,
  TGetArchivesResponse,
  TRestoreFromArchiveDynamicKeys
} from './model/archive.types'
