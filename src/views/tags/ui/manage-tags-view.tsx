import { Badge, Button, Container, Flex, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { AppTableActions } from '~/shared/ui/app-table-actions'
import { AppTableLoading } from '~/shared/ui/app-table-loading'
import { AppTableModule } from '~/shared/ui/app-table-module'
import {
  useCreateTag,
  useDeleteTag,
  useGetTags,
  useUpdateTag,
  type TGetTagByIdResponsePayload
} from '~/entities/tag'
import { Navbar } from '~/widgets/navbar'

const columnsHelper = createColumnHelper<TGetTagByIdResponsePayload>()

export const ManageTagsView = () => {
  const [tagModalOpened, { open: openTagModal, close: closeTagModal }] = useDisclosure(false)
  const [tagName, setTagName] = useState('')
  const [tagToUpdate, setTagToUpdate] = useState<TGetTagByIdResponsePayload | null>(null)

  const { mutateAsync: deleteTag, isPending: isDeletingTag } = useDeleteTag()
  const { data: tags = [], refetch: refetchTags, isLoading: isTagsLoading } = useGetTags()
  const { mutateAsync: createTag, isPending: isCreatingTag } = useCreateTag()
  const { mutateAsync: updateTag, isPending: isUpdatingTag } = useUpdateTag()

  async function onSubmitTag() {
    if (tagToUpdate) {
      await updateTag({ body: { name: tagName }, dynamicKeys: { tagId: tagToUpdate.id } })
    } else {
      await createTag({ name: tagName })
    }

    await refetchTags()

    closeModal()
  }

  function closeModal() {
    closeTagModal()
    setTagName('')
    setTagToUpdate(null)
  }

  const columns = useMemo(
    () => [
      columnsHelper.accessor('name', {
        header: 'Tag name',
        cell: ({ getValue }) => {
          return <Badge>{getValue()}</Badge>
        }
      }),
      columnsHelper.display({
        id: 'actions',
        header: 'Actions',
        size: 70,
        cell: ({ row }) => {
          return (
            <AppTableActions
              actions={[{ title: 'Update', action: 'update' }]}
              onDelete={async () => {
                await deleteTag({ tagId: row.original.id })
                await refetchTags()
              }}
              onUpdate={() => {
                setTagToUpdate(row.original)
                setTagName(row.original.name)
                openTagModal()
              }}
            />
          )
        }
      })
    ],
    [deleteTag, refetchTags, openTagModal]
  )

  const additionalTableOptions = useMemo(() => {
    return {
      manualPagination: false,
      manualFiltering: false,
      manualSorting: false
    }
  }, [])

  return (
    <>
      <div>
        <Navbar />

        <Container>
          <Flex justify="flex-end">
            <Button mb="md" type="button" onClick={openTagModal}>
              Add tag
            </Button>
          </Flex>
          <AppTableLoading isSkeleton={isTagsLoading} isLoadingOverlay={isDeletingTag}>
            <AppTableModule
              data={tags}
              columns={columns}
              additionalTableOptions={additionalTableOptions}
            />
          </AppTableLoading>
        </Container>
      </div>

      <Modal
        opened={tagModalOpened}
        onClose={() => {
          closeModal()
        }}
        title="Manage tags"
        centered
      >
        <TextInput
          mb="md"
          value={tagName}
          placeholder="eg. Typescript"
          onChange={event => setTagName(event.currentTarget.value)}
        />

        <Button
          mt="md"
          onClick={async () => {
            await onSubmitTag()
          }}
          loading={isCreatingTag || isUpdatingTag}
        >
          Add tag
        </Button>
      </Modal>
    </>
  )
}
