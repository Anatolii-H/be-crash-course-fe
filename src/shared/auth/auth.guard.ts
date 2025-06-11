import { redirect } from '@tanstack/react-router'

import { authService } from './auth.service'

export async function AuthGuard() {
  const session = await authService.verifySession()

  if (!session) {
    throw redirect({ to: '/login' })
  }
}
