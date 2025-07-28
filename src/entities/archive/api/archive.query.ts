import { useQuery } from '@tanstack/react-query'

import { archiveService } from './archive.service'
import type { TArchiveEntities, TGetArchiveByIdDynamicKeys } from '../model/archive.types'

export const useArchivesByEntityType = (entityType: TArchiveEntities) => {
  return useQuery({
    queryKey: ['/api/admin/archive/', entityType],
    queryFn: () => archiveService.getArchivesByEntityType(entityType)
  })
}

export const useArchiveById = (options: {
  dynamicKeys: TGetArchiveByIdDynamicKeys
  enabled?: boolean
}) => {
  return useQuery({
    queryKey: ['/api/admin/archive/{archiveId}/', options.dynamicKeys.archiveId],
    queryFn: () => archiveService.getArchiveById(options.dynamicKeys),
    enabled: options.enabled
  })
}
