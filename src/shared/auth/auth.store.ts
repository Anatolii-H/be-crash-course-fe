import { create } from 'zustand'

import type { TUserProfile, TUserAttributes } from './auth.types'
import { authService } from './auth.service'
import { httpClient } from '../api/http-client'

interface IAuthState {
  isAuthenticated: boolean
  isLoading: boolean
  cognitoUser: TUserAttributes | null
  userProfile: TUserProfile | null
  initializeSession: (options: { withLoadingOverlay: boolean }) => Promise<void>
}

export const useAuthStore = create<IAuthState>(set => ({
  isAuthenticated: false,
  isLoading: true,
  cognitoUser: null,
  userProfile: null,

  initializeSession: async (options: { withLoadingOverlay: boolean }) => {
    try {
      set({ isLoading: options.withLoadingOverlay })

      const session = await authService.verifySession()

      if (!session) {
        return
      }

      const [cognitoUser, userProfile] = await Promise.all([
        authService.getUserAttributes(),
        httpClient.get('/api/user/')
      ])

      set({
        isAuthenticated: true,
        isLoading: false,
        cognitoUser,
        userProfile
      })
    } catch (err) {
      set({
        isAuthenticated: false,
        cognitoUser: null,
        userProfile: null
      })

      throw err
    } finally {
      set({ isLoading: false })
    }
  }
}))
