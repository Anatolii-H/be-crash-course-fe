import '~/core/styles/index.css'

import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Amplify } from 'aws-amplify'

import { routeTree } from '~/shared/model/routeTree.gen.ts'
import { AMPLIFY_AUTH_CONFIG } from '~/shared/config/amplify'

const router = createRouter({ routeTree })

Amplify.configure({ Auth: AMPLIFY_AUTH_CONFIG })

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
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
  )
}
