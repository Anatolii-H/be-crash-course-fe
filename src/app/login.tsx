import { createFileRoute } from '@tanstack/react-router'

import { LoginView } from '~/views/auth'

export const Route = createFileRoute('/login')({
  component: LoginView
})
