import { createFileRoute } from '@tanstack/react-router'

import { AdminGuard } from '~/shared/auth/admin.guard'
import { ManageTagsView } from '~/views/tags'

export const Route = createFileRoute('/tags')({
  component: ManageTagsView,
  beforeLoad: ({ context }) => AdminGuard(context.auth?.role === 'admin')
})
