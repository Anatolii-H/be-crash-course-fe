import { createFileRoute } from '@tanstack/react-router'

import { LoginView } from '~/views/auth'
import { GuestGuard } from '~/shared/auth/guest.guard'

export const Route = createFileRoute('/login')({
  component: LoginView,
  beforeLoad: GuestGuard
})
