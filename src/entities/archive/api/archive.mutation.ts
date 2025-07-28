import { useMutation } from '@tanstack/react-query'
import type { TRestoreFromArchiveDynamicKeys } from '../model/archive.types'
import { archiveService } from './archive.service'

export const useRestoreFromArchive = () => {
  return useMutation({
    mutationFn: (dynamicKeys: TRestoreFromArchiveDynamicKeys) =>
      archiveService.restoreFromArchive(dynamicKeys)
  })
}
