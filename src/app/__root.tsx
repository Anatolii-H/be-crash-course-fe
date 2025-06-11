import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { MantineConfigProvider, QueryClientConfigProvider } from '~/core/providers'
import { SessionInitializer } from '~/core/providers/session-initializer'

export const Route = createRootRoute({
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
