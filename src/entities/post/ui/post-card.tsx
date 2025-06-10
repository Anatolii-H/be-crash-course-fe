import { ActionIcon, Badge, Card, Group, Image, Text, useMantineTheme } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import classes from './post-card.module.css'
import type { TGetPostsResponseItem } from '../model/post.types'

type TPostCardProps = {
  post: TGetPostsResponseItem
}

export const PostCard = ({ post }: TPostCardProps) => {
  const linkProps = { href: 'https://mantine.dev', target: '_blank', rel: 'noopener noreferrer' }
  const theme = useMantineTheme()

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image
            src="https://static.spacecrafted.com/bdcb89ef153b4eb28ffa328995516fbe/i/ca7a4439ea4d401c905ff146f8ada118/1/4SoifmQp45JMgBnHp7ed2/placeholder.png"
            height={180}
          />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
        outstanding
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {post.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {post.description}
      </Text>

      <Group justify="flex-end" className={classes.footer}>
        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconEdit size={16} color={theme.colors.lime[7]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconTrash size={16} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}
