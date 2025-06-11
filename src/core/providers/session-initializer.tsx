import { LoadingOverlay } from '@mantine/core'
import { useCallback, useEffect } from 'react'

import { useAuthStore } from '~/shared/auth/auth.store'
import { appNotifications } from '~/shared/lib/notifications.service'

import type { TChildrenProps } from '~/shared/model/global.types'

export const SessionInitializer = ({ children }: TChildrenProps) => {
  const initializeSession = useAuthStore(state => state.initializeSession)
  const isLoading = useAuthStore(state => state.isLoading)

  const initSession = useCallback(async () => {
    try {
      await initializeSession({ withLoadingOverlay: true })
    } catch {
      appNotifications.show({ message: 'Unexpected error', type: 'error' })
    }
  }, [initializeSession])

  useEffect(() => {
    initSession()
  }, [initSession])

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return children
}
