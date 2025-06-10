import '~/core/styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from '~/shared/model/routeTree.gen.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
