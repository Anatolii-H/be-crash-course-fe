import { redirect } from '@tanstack/react-router'

import { authService } from './auth.service'

export async function GuestGuard() {
  const session = await authService.verifySession()

  if (session) {
    throw redirect({ to: '/' })
  }
}
