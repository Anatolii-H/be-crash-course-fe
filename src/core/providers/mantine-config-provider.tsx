import { MantineProvider, ColorSchemeScript } from '@mantine/core'

import type { TChildrenProps } from '~/shared/model/global.types'
import { theme } from '../styles/mantine/theme'

export const MantineConfigProvider = ({ children }: TChildrenProps) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />

      <MantineProvider theme={theme} defaultColorScheme="dark">
        {children}
      </MantineProvider>
    </>
  )
}
