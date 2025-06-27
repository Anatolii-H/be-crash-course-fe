import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuthStore } from '~/shared/auth/auth.store'

import { routeTree } from '~/shared/model/routeTree.gen'

const router = createRouter({ routeTree, context: { auth: null, isLoading: true } })

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Register {
    router: typeof router
  }
}

export const RouterConfigProvider = () => {
  const userProfile = useAuthStore(state => state.userProfile)
  const isLoading = useAuthStore(state => state.isLoading)

  return <RouterProvider router={router} context={{ auth: userProfile, isLoading }} />
}
