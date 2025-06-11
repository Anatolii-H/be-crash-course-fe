import { useMemo, useState } from 'react'
import {
  Box,
  Center,
  Container,
  LoadingOverlay,
  Pagination,
  TextInput,
  Select,
  Group,
  Radio,
  Title,
  NumberInput
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'

import { Footer } from '~/widgets/footer'
import { Navbar } from '~/widgets/navbar'
import { PostCard, useGetPosts } from '~/entities/post'
import type {
  TGetPostsRequestParametersSortBy,
  TGetPostsRequestParametersSortOrder
} from '~/entities/post'
import { AppCardSkeleton } from '~/shared/ui/app-card-skeleton'

import classes from './home-view.module.css'

export const HomeView = () => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 6 })
  const [search, setSearch] = useDebouncedState('', 300)
  const [sortBy, setSortBy] = useState<TGetPostsRequestParametersSortBy | null>(null)
  const [minCommentsCount, setMinCommentsCount] = useState<string | number>(0)
  const [sortOrder, setSortOrder] = useState<TGetPostsRequestParametersSortOrder>('asc')

  const { data, isLoading, isFetched } = useGetPosts({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sortBy: sortBy ?? undefined,
    sortOrder,
    search,
    minCommentsCount: Number(minCommentsCount)
  })

  const posts = useMemo(() => data?.data ?? [], [data?.data])
  const total = useMemo(() => data?.meta.totalPages ?? 0, [data?.meta.totalPages])

  return (
    <Box className={classes.root}>
      <Navbar />

      <Box component="main" className={classes.main}>
        <Container>
          <Box mb="xl" className={classes.filtersWrapper}>
            <Select
              placeholder="Sort by..."
              data={['title', 'createdAt', 'commentsCount']}
              value={sortBy}
              onChange={value => setSortBy(value as TGetPostsRequestParametersSortBy)}
              comboboxProps={{
                transitionProps: { transition: 'scale-y', duration: 250 }
              }}
            />

            <Radio.Group
              ml="xl"
              mr="xl"
              value={sortOrder}
              onChange={value => setSortOrder(value as TGetPostsRequestParametersSortOrder)}
              name="favoriteFramework"
            >
              <Group>
                <Radio value="asc" label="A-Z" />
                <Radio value="desc" label="Z-A" />
              </Group>
            </Radio.Group>

            <NumberInput
              value={minCommentsCount}
              onChange={setMinCommentsCount}
              w={100}
              min={0}
              allowDecimal={false}
              placeholder="Min"
            />

            <TextInput
              defaultValue={search}
              ml="auto"
              placeholder="Search..."
              onChange={event => setSearch(event.currentTarget.value)}
            />
          </Box>

          <Box className={classes.blogWrapper}>
            <LoadingOverlay
              visible={!isFetched && !isLoading}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <AppCardSkeleton isLoading={isLoading}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </AppCardSkeleton>
          </Box>

          {!posts.length && !isLoading && <Title ta="center">No posts found...</Title>}

          <Center>
            <Pagination
              total={total}
              value={pagination.pageIndex}
              onChange={value => setPagination(prev => ({ ...prev, pageIndex: value }))}
              classNames={{ root: classes.paginationRoot }}
            />
          </Center>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
