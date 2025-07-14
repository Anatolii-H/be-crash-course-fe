import type { ReactNode } from 'react'
import clsx from 'clsx'
import type { LoadingOverlayProps } from '@mantine/core'
import { Box, LoadingOverlay, Skeleton } from '@mantine/core'

import type { TClassNameProps } from '../../model/global.types'

type TAppTableListSkeletonProps = TClassNameProps & {
  children: ReactNode
  isSkeleton?: boolean
  isLoadingOverlay?: boolean
  loadingOverlayProps?: LoadingOverlayProps
  nRows?: number
  nCols?: number
  gapY?: number
  gapX?: number
  rowHeight?: number
  displayCircle?: boolean
}

export const AppTableLoading = ({
  isSkeleton,
  isLoadingOverlay,
  loadingOverlayProps,
  children,
  className,
  nRows = 5,
  nCols = 4,
  gapY = 20,
  gapX = 20,
  rowHeight = 22,
  displayCircle = true
}: TAppTableListSkeletonProps) => {
  if (!isSkeleton) {
    return (
      <Box className={clsx(className)} style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoadingOverlay} {...loadingOverlayProps} />

        {children}
      </Box>
    )
  }

  return (
    <Box mt={40} className={clsx(className)}>
      {Array.from({ length: nRows }).map((_, rowIndex) => (
        <Box
          key={`row-${rowIndex}`}
          style={{
            marginBottom: gapY,
            columnGap: gapX,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {displayCircle && (
            <Skeleton
              circle
              width={(12 / 11) * rowHeight}
              height={(12 / 11) * rowHeight}
              style={{ flexShrink: 0 }}
            />
          )}

          {Array.from({ length: nCols }).map((_, colIndex) => (
            <Skeleton key={`column-${colIndex}`} height={rowHeight} style={{ flex: 1 }} />
          ))}
        </Box>
      ))}
    </Box>
  )
}
