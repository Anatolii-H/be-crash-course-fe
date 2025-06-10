import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { MantineConfigProvider, QueryClientConfigProvider } from '~/core/providers'

export const Route = createRootRoute({
  component: rootComponent
})

function rootComponent() {
  return (
    <>
      <QueryClientConfigProvider>
        <MantineConfigProvider>
          <Outlet />
        </MantineConfigProvider>
      </QueryClientConfigProvider>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
