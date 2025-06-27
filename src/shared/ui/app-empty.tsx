import { Box, Image, Text } from '@mantine/core'

import type { ImageProps } from '@mantine/core'

import clsx from 'clsx'

type TAppEmptyProps = ImageProps & {
  description?: string
  wrapperClass?: string
  descriptionClass?: string
}

export const AppEmpty = ({
  w = 160,
  h = 175,
  description = 'No data',
  wrapperClass,
  descriptionClass,
  ...props
}: TAppEmptyProps) => {
  return (
    <Box className={clsx(wrapperClass)}>
      <Image
        mx="auto"
        w={w}
        h={h}
        src="/empty-placeholder.svg"
        alt="Empty placeholder"
        {...props}
      />

      <Text ta="center" mt="2rem" className={clsx(descriptionClass)}>
        {description}
      </Text>
    </Box>
  )
}
