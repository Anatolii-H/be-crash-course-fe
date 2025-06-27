import { redirect } from '@tanstack/react-router'

import { authService } from './auth.service'

export async function AdminGuard(isAdmin: boolean) {
  const session = await authService.verifySession()

  if (!session) {
    throw redirect({ to: '/login' })
  }

  if (!isAdmin) {
    throw redirect({ to: '/' })
  }
}
