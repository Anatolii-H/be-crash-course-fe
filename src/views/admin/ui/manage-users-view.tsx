import { useMemo, useState } from 'react'
import { Container, Flex, Text, TextInput } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { createColumnHelper, type PaginationState } from '@tanstack/react-table'
import { IconUserFilled } from '@tabler/icons-react'
import clsx from 'clsx'

import { AppRender } from '~/shared/ui/app-render'
import { useAuthStore } from '~/shared/auth/auth.store'
import { useDisableUser, useEnableUser, useGetUsers, type TUsersReponseItem } from '~/entities/user'
import { AppTableActions } from '~/shared/ui/app-table-actions'
import { AppTableModule } from '~/shared/ui/app-table-module'
import { Navbar } from '~/widgets/navbar'

import classes from './manage-users-view.module.css'

const columnsHelper = createColumnHelper<TUsersReponseItem>()

export const ManageUsersView = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [search, setSearch] = useDebouncedState('', 250)
  const profileId = useAuthStore(state => state.userProfile?.id)

  const { mutateAsync: disableUser } = useDisableUser()
  const { mutateAsync: enableUser } = useEnableUser()

  const { data: users, refetch } = useGetUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search
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
        cell: ({ row, getValue }) => {
          return (
            <Flex align="center">
              <AppRender vIf={row.original.id === profileId}>
                <IconUserFilled size={12} />
              </AppRender>
              <Text
                ml={10}
                className={clsx({
                  [classes.disabledUser as string]: row.original.isDisabled
                })}
                size="xs"
                truncate
              >
                {getValue()}
              </Text>
            </Flex>
          )
        }
      }),
      columnsHelper.accessor('email', {
        header: 'Email',
        enableSorting: false,
        cell: ({ row, getValue }) => {
          return (
            <Text
              className={clsx({
                [classes.disabledUser as string]: row.original.isDisabled
              })}
              size="xs"
              truncate
            >
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
                  title: 'Enable',
                  action: 'enable',
                  color: 'red',
                  disabled: !row.original.isDisabled || profileId === userId
                },
                {
                  title: 'Disable',
                  action: 'disable',
                  color: 'red',
                  disabled: row.original.isDisabled || profileId === userId
                }
              ]}
              onEnable={async () => {
                await enableUser({ userId })
                await refetch()
              }}
              onDisable={async () => {
                await disableUser({ userId })
                await refetch()
              }}
              showDelete={false}
            />
          )
        }
      })
    ],
    [disableUser, enableUser, refetch, profileId]
  )

  return (
    <div>
      <Navbar />

      <Container>
        <TextInput
          mb="md"
          placeholder="Search by name or email..."
          maw={300}
          defaultValue={search}
          onChange={event => setSearch(event.currentTarget.value)}
        />
        <AppTableModule
          data={users?.data ?? []}
          columns={columns}
          onPaginationChange={setPagination}
          paginationOptions={paginationOptions}
        />
      </Container>
    </div>
  )
}
