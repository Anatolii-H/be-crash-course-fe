import '~/core/styles/index.css'

import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'

import { AMPLIFY_AUTH_CONFIG } from '~/shared/config/amplify'
import { RouterConfigProvider } from '~/core/providers'

Amplify.configure({ Auth: AMPLIFY_AUTH_CONFIG })

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)

  root.render(
    // <StrictMode>
    <RouterConfigProvider />
    // </StrictMode>
  )
}
