import { Badge, Box, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createColumnHelper } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import {
  useArchivesByEntityType,
  useRestoreFromArchive,
  type TGetArchivesResponse
} from '~/entities/archive'
import { AppTableActions } from '~/shared/ui/app-table-actions'
import { AppTableLoading } from '~/shared/ui/app-table-loading'
import { AppTableModule } from '~/shared/ui/app-table-module'
import { ArchiveHardDeletePreviewModal } from './archive-hard-delete-preview-modal'

const columnsHelper = createColumnHelper<TGetArchivesResponse[number]>()

export const ArchiveHardDeleteTable = () => {
  const { mutateAsync: restoreFromArchive, isPending: isRestoringFromArchive } =
    useRestoreFromArchive()

  const [modalOpened, { open, close }] = useDisclosure(false)
  const [selectedArchiveId, setSelectedArchiveId] = useState<string | null>(null)

  const openPreview = useCallback(
    (id: string) => {
      setSelectedArchiveId(id)
      open()
    },
    [open]
  )

  const {
    data: archives = [],
    refetch,
    isLoading: isArchivesLoading,
    isFetched: isArchivesFetched
  } = useArchivesByEntityType('user')

  const additionalTableOptions = useMemo(() => {
    return {
      manualPagination: false,
      manualFiltering: false,
      manualSorting: false
    }
  }, [])

  const columns = useMemo(
    () => [
      columnsHelper.accessor('entityType', {
        header: 'Entity type',
        enableSorting: false,
        cell: ({ getValue }) => {
          return <Badge>{getValue()}</Badge>
        }
      }),
      columnsHelper.accessor('archivedAt', {
        header: 'Archived at',
        enableSorting: false,
        cell: ({ getValue }) => {
          return (
            <Text size="xs" truncate>
              {new Date(getValue()).toLocaleString()}
            </Text>
          )
        }
      }),
      columnsHelper.display({
        id: 'actions',
        header: 'Actions',
        size: 70,
        cell: ({ row }) => {
          const archiveId = row.original.id

          return (
            <AppTableActions
              actions={[
                {
                  title: 'Restore',
                  action: 'restore',
                  color: 'green'
                },
                {
                  title: 'View data',
                  action: 'preview'
                }
              ]}
              onRestore={async () => {
                await restoreFromArchive({ archiveId })
                await refetch()
              }}
              onPreview={() => openPreview(archiveId)}
              showDelete={false}
            />
          )
        }
      })
    ],
    [refetch, restoreFromArchive, openPreview]
  )

  return (
    <>
      <Box mt="md">
        <AppTableLoading
          isSkeleton={isArchivesLoading}
          isLoadingOverlay={!isArchivesFetched || isRestoringFromArchive}
        >
          <AppTableModule
            data={archives ?? []}
            columns={columns}
            additionalTableOptions={additionalTableOptions}
          />
        </AppTableLoading>
      </Box>

      <ArchiveHardDeletePreviewModal
        opened={modalOpened}
        onClose={close}
        archiveId={selectedArchiveId}
      />
    </>
  )
}
