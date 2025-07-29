import { Modal, type ModalProps, Loader, Center, Text } from '@mantine/core'
import { useArchiveById } from '~/entities/archive'

type TArchiveHardDeletePreviewModalProps = {
  archiveId: string | null
} & ModalProps

export const ArchiveHardDeletePreviewModal = ({
  opened,
  archiveId,
  onClose,
  ...props
}: TArchiveHardDeletePreviewModalProps) => {
  const { data: archiveData, isLoading } = useArchiveById({
    dynamicKeys: { archiveId: archiveId! },
    enabled: Boolean(archiveId) && opened
  })

  return (
    <Modal fullScreen opened={opened} onClose={onClose} title="Archive preview" centered {...props}>
      {isLoading ? (
        <Center p="md">
          <Loader />
        </Center>
      ) : archiveData ? (
        <pre>{JSON.stringify(archiveData.data, null, 2)}</pre>
      ) : (
        <Text c="red">Failed to load archive data</Text>
      )}
    </Modal>
  )
}
