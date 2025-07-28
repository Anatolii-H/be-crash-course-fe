import { Box, Flex, Text, TextInput } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { createColumnHelper, type PaginationState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useGetUsers, useSoftRestoreUser, type TUsersReponseItem } from '~/entities/user'
import { AppTableActions } from '~/shared/ui/app-table-actions'
import { AppTableLoading } from '~/shared/ui/app-table-loading'
import { AppTableModule } from '~/shared/ui/app-table-module'

const columnsHelper = createColumnHelper<TUsersReponseItem>()

export const ArchiveSoftDeleteTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [search, setSearch] = useDebouncedState('', 250)
  const { mutateAsync: softRestoreUser, isPending: isSoftRestoringUser } = useSoftRestoreUser()

  const {
    data: users,
    refetch,
    isLoading: isUsersLoading,
    isFetched: isUsersFetched
  } = useGetUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search,
    softDeletedOnly: true
  })

  const paginationOptions = useMemo(
    () => ({
      pageCount: users?.meta.totalPages,
      pageSize: users?.meta.pageSize
    }),
    [users?.meta.pageSize, users?.meta.totalPages]
  )

  const columns = useMemo(
    () => [
      columnsHelper.accessor(user => `${user.firstName} ${user.lastName}`, {
        header: 'Name',
        id: 'fullname',
        enableSorting: false,
        cell: ({ getValue }) => {
          return (
            <Flex align="center">
              <Text ml={10} size="xs" truncate>
                {getValue()}
              </Text>
            </Flex>
          )
        }
      }),
      columnsHelper.accessor('email', {
        header: 'Email',
        enableSorting: false,
        cell: ({ getValue }) => {
          return (
            <Text size="xs" truncate>
              {getValue()}
            </Text>
          )
        }
      }),
      columnsHelper.display({
        id: 'actions',
        header: 'Actions',
        size: 70,
        cell: ({ row }) => {
          const userId = row.original.id

          return (
            <AppTableActions
              actions={[
                {
                  title: 'Restore',
                  action: 'restore',
                  color: 'green'
                }
              ]}
              onRestore={async () => {
                await softRestoreUser({ userId })
                await refetch()
              }}
              showDelete={false}
            />
          )
        }
      })
    ],
    [refetch, softRestoreUser]
  )

  return (
    <Box mt="md">
      <Flex justify="space-between">
        <TextInput
          mb="md"
          placeholder="Search by name or email..."
          maw={300}
          defaultValue={search}
          onChange={event => setSearch(event.currentTarget.value)}
        />
      </Flex>
      <AppTableLoading
        isSkeleton={isUsersLoading}
        isLoadingOverlay={!isUsersFetched || isSoftRestoringUser}
      >
        <AppTableModule
          data={users?.data ?? []}
          columns={columns}
          onPaginationChange={setPagination}
          paginationOptions={paginationOptions}
        />
      </AppTableLoading>
    </Box>
  )
}
