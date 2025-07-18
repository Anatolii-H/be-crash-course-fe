import {
  Button,
  Center,
  Container,
  Image,
  Text,
  Title,
  Divider,
  Table,
  Group,
  Avatar,
  ActionIcon,
  TextInput,
  Badge
} from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useParams, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { useAuthStore } from '~/shared/auth/auth.store'
import { useCreateComment, useEditComment, useDeleteComment } from '~/entities/comment'
import { useGetPost } from '~/entities/post'

export const PostView = () => {
  const { postId } = useParams({ from: '/posts/$postId' })
  const { navigate } = useRouter()
  const { data: post, isLoading: isPostFetching, refetch: refetchPost } = useGetPost({ postId })
  const { mutateAsync: createComment, isPending: isCreatingComment } = useCreateComment()
  const { mutateAsync: editComment, isPending: isEditingComment } = useEditComment()
  const { mutateAsync: deleteComment } = useDeleteComment()
  const isAdmin = useAuthStore(state => state.userProfile?.role === 'admin')

  const [editCommentId, setEditCommentId] = useState<string>('')
  const [editCommentValue, setEditCommentValue] = useState('')
  const [newCommentValue, setNewCommentValue] = useState('')
  const userProfileId = useAuthStore(state => state.userProfile?.id)

  const onEdit = (comment: { id: string; text: string; createdAt: string; updatedAt: string }) => {
    if (!editCommentId) {
      setEditCommentId(comment.id)
      setEditCommentValue(comment.text)
    } else {
      setEditCommentId('')
      setEditCommentValue('')
    }
  }

  const onCreateComment = async () => {
    await createComment({ body: { text: newCommentValue }, dynamicKeys: { postId } })
    await refetchPost()

    setNewCommentValue('')
  }

  const onEditComment = async () => {
    await editComment({
      body: { text: editCommentValue },
      dynamicKeys: { commentId: editCommentId, postId }
    })
    await refetchPost()

    setEditCommentId('')
    setEditCommentValue('')
  }

  const onDeleteComment = async (commentId: string) => {
    await deleteComment({ commentId, postId })

    await refetchPost()
  }

  const rows = post?.comments.map(comment => (
    <Table.Tr key={comment.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={30}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
            radius={30}
          />
          <Text fz="sm" fw={500}>
            {comment.author.firstName} {comment.author.lastName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{comment.text}</Text>
      </Table.Td>
      <Table.Td>
        {(comment.author.id === userProfileId || isAdmin) && (
          <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="gray" onClick={() => onEdit(comment)}>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={() => onDeleteComment(comment.id)}>
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        )}
      </Table.Td>
    </Table.Tr>
  ))

  if (isPostFetching) {
    return (
      <Container>
        <Center>
          <Title mt="xl" order={2}>
            Loading...
          </Title>
        </Center>
      </Container>
    )
  }

  return (
    <Container>
      <Button mt="xl" mb="xl" onClick={() => navigate({ to: '/' })}>
        Back to dashboard
      </Button>

      <Image
        mb="md"
        radius="sm"
        maw={400}
        src="https://static.spacecrafted.com/bdcb89ef153b4eb28ffa328995516fbe/i/ca7a4439ea4d401c905ff146f8ada118/1/4SoifmQp45JMgBnHp7ed2/placeholder.png"
        height={180}
      />

      <div>
        {post?.tags.map(tag => (
          <Badge mr="xs" key={tag.id} variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
            {tag.name}
          </Badge>
        ))}
      </div>

      <Title mt="sm">{post?.title}</Title>

      {post?.description ? <Text mt="xs">{post?.description}</Text> : null}

      <Divider mt="sm" mb="xl" />

      <Group mb="xl">
        <TextInput
          style={{ width: '100%' }}
          placeholder="Add comment"
          value={newCommentValue}
          onChange={event => setNewCommentValue(event.currentTarget.value)}
        />
        <Button type="button" onClick={onCreateComment} loading={isCreatingComment}>
          Add comment
        </Button>
      </Group>

      {editCommentId && (
        <Group>
          <TextInput
            style={{ width: '100%' }}
            placeholder="Edit comment"
            value={editCommentValue}
            onChange={event => setEditCommentValue(event.currentTarget.value)}
          />
          <Button type="button" onClick={onEditComment} loading={isEditingComment}>
            Update
          </Button>
        </Group>
      )}

      <Text mt="xl">Comments ({post?.comments.length})</Text>

      {post?.comments.length ? (
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Employee</Table.Th>
                <Table.Th>Comment</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : null}
    </Container>
  )
}
