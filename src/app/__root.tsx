import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { MantineConfigProvider, QueryClientConfigProvider } from '~/core/providers'
import { SessionInitializer } from '~/core/providers/session-initializer'
import type { IAuthState } from '~/shared/auth/auth.store'

interface IRouterContext {
  auth: IAuthState['userProfile']
  isLoading: boolean
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <QueryClientConfigProvider>
        <MantineConfigProvider>
          <SessionInitializer>
            <Outlet />
          </SessionInitializer>
        </MantineConfigProvider>
      </QueryClientConfigProvider>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
