import { createFileRoute } from '@tanstack/react-router'

import { SignupView } from '~/views/auth'

export const Route = createFileRoute('/signup')({
  component: SignupView
})
