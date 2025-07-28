import { createFileRoute } from '@tanstack/react-router'

import { AdminGuard } from '~/shared/auth/admin.guard'
import { ArchiveView } from '~/views/archive'

export const Route = createFileRoute('/archive')({
  component: ArchiveView,
  beforeLoad: ({ context }) => AdminGuard(context.auth?.role === 'admin')
})
