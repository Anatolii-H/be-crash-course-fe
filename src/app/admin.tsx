import { createFileRoute } from '@tanstack/react-router'
import { AdminGuard } from '~/shared/auth/admin.guard'

import { ManageUsersView } from '~/views/admin'

export const Route = createFileRoute('/admin')({
  component: ManageUsersView,
  beforeLoad: ({ context }) => AdminGuard(context.auth?.role === 'admin')
})
