import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from '~/shared/auth/auth.guard'

import { HomeView } from '~/views/home'

export const Route = createFileRoute('/')({
  component: HomeView,
  beforeLoad: AuthGuard
})
