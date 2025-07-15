import { ActionIcon, Badge, Card, Group, Image, Text, useMantineTheme } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { useAuthStore } from '~/shared/auth/auth.store'

import type { TGetPostsResponseItem } from '../model/post.types'

import classes from './post-card.module.css'

type TPostCardProps = {
  post: TGetPostsResponseItem
  onEdit?: (post: TGetPostsResponseItem) => void
  onDelete?: (post: TGetPostsResponseItem) => void
}

export const PostCard = ({ post, onEdit, onDelete }: TPostCardProps) => {
  const theme = useMantineTheme()
  const userProfileId = useAuthStore(state => state.userProfile?.id)
  const isAdmin = useAuthStore(state => state.userProfile?.role === 'admin')

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link to="/posts/$postId" params={{ postId: post.id }}>
          <Image
            src="https://static.spacecrafted.com/bdcb89ef153b4eb28ffa328995516fbe/i/ca7a4439ea4d401c905ff146f8ada118/1/4SoifmQp45JMgBnHp7ed2/placeholder.png"
            height={180}
          />
        </Link>
      </Card.Section>

      <div className={classes.rating}>
        {post.tags.map(tag => (
          <Badge mr="xs" key={tag.id} variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
            {tag.name}
          </Badge>
        ))}
      </div>

      <Text className={classes.title} fw={500}>
        {post.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {post.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Text>Comments: {post.commentsCount}</Text>

        {(post.authorId === userProfileId || isAdmin) && (
          <Group gap={8} mr={0}>
            <ActionIcon className={classes.action} onClick={() => onEdit?.(post)}>
              <IconEdit size={16} color={theme.colors.lime[7]} />
            </ActionIcon>
            <ActionIcon className={classes.action} onClick={() => onDelete?.(post)}>
              <IconTrash size={16} color={theme.colors.red[6]} />
            </ActionIcon>
          </Group>
        )}
      </Group>
    </Card>
  )
}
