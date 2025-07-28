import { useMemo, useState } from 'react'
import { Badge, Button, Container, Flex, Modal, Text, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { createColumnHelper, type PaginationState } from '@tanstack/react-table'
import { IconUserFilled } from '@tabler/icons-react'
import clsx from 'clsx'

import { AppTableLoading } from '~/shared/ui/app-table-loading'
import { AppTableActions } from '~/shared/ui/app-table-actions'
import { AppTableModule } from '~/shared/ui/app-table-module'
import { AppRender } from '~/shared/ui/app-render'
import { useAuthStore } from '~/shared/auth/auth.store'
import {
  useDisableUser,
  useEnableUser,
  useGetUsers,
  useHardDeleteUser,
  useInviteUser,
  useResendInvite,
  useSoftDeleteUser,
  type TUsersReponseItem
} from '~/entities/user'

import { Navbar } from '~/widgets/navbar'

import classes from './manage-users-view.module.css'

const columnsHelper = createColumnHelper<TUsersReponseItem>()

export const ManageUsersView = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [inviteEmail, setInviteEmail] = useState('')
  const [search, setSearch] = useDebouncedState('', 250)

  const profileId = useAuthStore(state => state.userProfile?.id)

  const { mutateAsync: disableUser, isPending: isDisablingUser } = useDisableUser()
  const { mutateAsync: enableUser, isPending: isEnablingUser } = useEnableUser()
  const { mutateAsync: inviteUser, isPending: isInvitingUser } = useInviteUser()
  const { mutateAsync: resendInvite, isPending: isResendingInvite } = useResendInvite()
  const { mutateAsync: softDeleteUser, isPending: isSoftDeletingUser } = useSoftDeleteUser()
  const { mutateAsync: hardDeleteUser, isPending: isHardDeletingUser } = useHardDeleteUser()

  const {
    data: users,
    refetch,
    isLoading: isUsersLoading,
    isFetched: isUsersFetched
  } = useGetUsers({
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
      columnsHelper.accessor('isPending', {
        header: 'Email',
        id: 'isPending',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <>
              {row.original.isDisabled ? (
                <Badge color="red">Disabled</Badge>
              ) : row.original.isPending ? (
                <Badge color="yellow">Pending</Badge>
              ) : (
                <Badge color="green">Active</Badge>
              )}
            </>
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
              isDisabled={profileId === userId}
              actions={[
                {
                  title: 'Enable',
                  action: 'enable',
                  color: 'green',
                  hidden: !row.original.isDisabled || profileId === userId
                },
                {
                  title: 'Disable',
                  action: 'disable',
                  color: 'red',
                  hidden: row.original.isDisabled || profileId === userId
                },
                {
                  title: 'Soft delete',
                  action: 'softDelete',
                  color: 'yellow',
                  hidden: row.original.isDisabled || profileId === userId
                },
                {
                  title: 'Hard delete',
                  action: 'hardDelete',
                  color: 'red',
                  hidden: row.original.isDisabled || profileId === userId
                },
                {
                  title: 'Resend Invite',
                  action: 'resendInvite',
                  color: 'yellow',
                  hidden: !row.original.isPending
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
              onResendInvite={async () => {
                await resendInvite({ userId })
              }}
              onSoftDelete={async () => {
                await softDeleteUser({ userId })
                await refetch()
              }}
              onHardDelete={async () => {
                await hardDeleteUser({ userId })
                await refetch()
              }}
              showDelete={false}
            />
          )
        }
      })
    ],
    [disableUser, enableUser, refetch, resendInvite, softDeleteUser, hardDeleteUser, profileId]
  )

  return (
    <>
      <div>
        <Navbar />

        <Container>
          <Flex justify="space-between">
            <TextInput
              mb="md"
              placeholder="Search by name or email..."
              maw={300}
              defaultValue={search}
              onChange={event => setSearch(event.currentTarget.value)}
            />
            <Button type="button" onClick={open}>
              Invite
            </Button>
          </Flex>
          <AppTableLoading
            isSkeleton={isUsersLoading}
            isLoadingOverlay={
              !isUsersFetched ||
              isDisablingUser ||
              isEnablingUser ||
              isResendingInvite ||
              isSoftDeletingUser ||
              isHardDeletingUser
            }
          >
            <AppTableModule
              data={users?.data ?? []}
              columns={columns}
              onPaginationChange={setPagination}
              paginationOptions={paginationOptions}
            />
          </AppTableLoading>
        </Container>
      </div>

      <Modal
        opened={opened}
        onClose={() => {
          close()
        }}
        title="Invite user"
        centered
      >
        <TextInput
          mb="md"
          value={inviteEmail}
          placeholder="Email"
          onChange={event => setInviteEmail(event.currentTarget.value)}
        />

        <Button
          mt="md"
          onClick={async () => {
            await inviteUser({ email: inviteEmail })
            await refetch()
            close()
            setInviteEmail('')
          }}
          loading={isInvitingUser}
        >
          Invite
        </Button>
      </Modal>
    </>
  )
}
