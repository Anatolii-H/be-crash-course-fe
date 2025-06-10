import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { TChildrenProps } from '~/shared/model/global.types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const QueryClientConfigProvider = ({ children }: TChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="left" buttonPosition="bottom-left" initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
