import { createFileRoute } from '@tanstack/react-router'

import { ResetPasswordView } from '~/views/auth'

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordView
})
