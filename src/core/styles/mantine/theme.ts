import { createTheme } from '@mantine/core'
import type { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = createTheme({
  fontSmoothing: true,
  focusRing: 'auto',
  cursorType: 'pointer',
  scale: 1.6,
  black: '#000',
  white: '#fff',
  respectReducedMotion: false,
  primaryColor: 'lime'
})
