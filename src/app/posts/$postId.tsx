import { createFileRoute } from '@tanstack/react-router'

import { PostView } from '~/views/posts'

export const Route = createFileRoute('/posts/$postId')({
  component: PostView
})
