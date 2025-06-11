import { createFileRoute } from '@tanstack/react-router'

import { SignupView } from '~/views/auth'
import { GuestGuard } from '~/shared/auth/guest.guard'

export const Route = createFileRoute('/signup')({
  component: SignupView,
  beforeLoad: GuestGuard
})
