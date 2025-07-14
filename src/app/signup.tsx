import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'

import { SignupView } from '~/views/auth'
import { GuestGuard } from '~/shared/auth/guest.guard'

const acceptInviteSchema = z.object({
  email: z.email().optional(),
  expireAt: z.number().optional(),
  signature: z.string().optional()
})

export const Route = createFileRoute('/signup')({
  component: SignupView,
  beforeLoad: GuestGuard,
  validateSearch: acceptInviteSchema
})
