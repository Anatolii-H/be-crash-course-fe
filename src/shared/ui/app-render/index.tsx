import type { ReactNode } from 'react'

type TAppRenderProps = {
  vIf: boolean
  children: ReactNode
}

export const AppRender = ({ vIf, children }: TAppRenderProps) => {
  if (vIf) {
    return children
  }

  return null
}
