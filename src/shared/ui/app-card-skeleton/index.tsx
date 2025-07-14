import clsx from 'clsx'
import { Box, type BoxProps, Skeleton } from '@mantine/core'

import type { TChildrenProps, TClassNameProps } from '../../model/global.types'

import classes from './app-card-skeleton.module.css'

type TAppCardSkeletonProps = TChildrenProps &
  TClassNameProps &
  BoxProps & {
    isLoading: boolean
  }

export const AppCardSkeleton = ({
  children,
  className,
  isLoading,
  ...props
}: TAppCardSkeletonProps) => {
  if (!isLoading) {
    return children
  }

  return (
    <>
      <Box className={clsx(classes.wrapper, className)} {...props}>
        <Skeleton style={{ margin: '0 auto 2rem auto' }} height={55} circle />
        <Skeleton style={{ width: '50%', margin: '0 auto 1rem auto' }} height={15} />
        <Skeleton style={{ width: '50%', margin: '0 auto' }} height={15} />
        <Skeleton style={{ marginTop: 'auto', marginBottom: '1rem' }} height={40} />
      </Box>
      <Box className={clsx(classes.wrapper, className)} {...props}>
        <Skeleton style={{ margin: '0 auto 2rem auto' }} height={55} circle />
        <Skeleton style={{ width: '50%', margin: '0 auto 1rem auto' }} height={15} />
        <Skeleton style={{ width: '50%', margin: '0 auto' }} height={15} />
        <Skeleton style={{ marginTop: 'auto', marginBottom: '1rem' }} height={40} />
      </Box>
    </>
  )
}
