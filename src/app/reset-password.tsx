import { createFileRoute } from '@tanstack/react-router'

import { ResetPasswordView } from '~/views/auth'
import { GuestGuard } from '~/shared/auth/guest.guard'

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordView,
  beforeLoad: GuestGuard
})
