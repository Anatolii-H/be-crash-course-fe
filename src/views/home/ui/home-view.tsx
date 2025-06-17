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
  NumberInput,
  Modal,
  Button
} from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'

import { Footer } from '~/widgets/footer'
import { Navbar } from '~/widgets/navbar'
import { PostCard, useGetPosts } from '~/entities/post'
import type {
  TGetPostsRequestParametersSortBy,
  TGetPostsRequestParametersSortOrder
} from '~/entities/post'
import { AppCardSkeleton } from '~/shared/ui/app-card-skeleton'

import classes from './home-view.module.css'
import { useCreatePost, useDeletePost, useEditPost } from '~/entities/post/api/post.mutation'

export const HomeView = () => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 6 })
  const [search, setSearch] = useDebouncedState('', 300)
  const [sortBy, setSortBy] = useState<TGetPostsRequestParametersSortBy | null>(null)
  const [minCommentsCount, setMinCommentsCount] = useState<string | number>(0)
  const [sortOrder, setSortOrder] = useState<TGetPostsRequestParametersSortOrder>('asc')
  const [opened, { open, close }] = useDisclosure(false)
  const { mutateAsync: deletePost } = useDeletePost()
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const { mutateAsync: editPost } = useEditPost()
  const { mutateAsync: createPost } = useCreatePost()

  const [editPostPayload, setEditPostPayload] = useState({
    title: '',
    description: '',
    id: ''
  })

  const { data, isLoading, isFetched, refetch } = useGetPosts({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sortBy: sortBy ?? undefined,
    sortOrder,
    search,
    minCommentsCount: Number(minCommentsCount)
  })

  const posts = useMemo(() => data?.data ?? [], [data?.data])
  const total = useMemo(() => data?.meta.totalPages ?? 0, [data?.meta.totalPages])

  const onSubmitPost = async () => {
    if (isCreatingPost) {
      await createPost(editPostPayload)
    } else {
      await editPost({ body: editPostPayload, dynamicKeys: { postId: editPostPayload.id } })
    }

    await refetch()

    close()

    setIsCreatingPost(false)
    setEditPostPayload({
      title: '',
      description: '',
      id: ''
    })
  }

  return (
    <>
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

            <Button
              mb="md"
              onClick={() => {
                setIsCreatingPost(true)
                open()
              }}
            >
              Add new post
            </Button>

            <Box className={classes.blogWrapper}>
              <LoadingOverlay
                visible={!isFetched && !isLoading}
                overlayProps={{ radius: 'sm', blur: 2 }}
              />
              <AppCardSkeleton isLoading={isLoading}>
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={async post => {
                      await deletePost({ postId: post.id })
                      await refetch()
                    }}
                    onEdit={post => {
                      setEditPostPayload({
                        title: post.title,
                        description: post.description,
                        id: post.id
                      })

                      open()
                    }}
                  />
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

      <Modal
        opened={opened}
        onClose={() => {
          close()
          setEditPostPayload({ title: '', description: '', id: '' })
          setIsCreatingPost(false)
        }}
        title="Edit post"
        centered
      >
        <TextInput
          mb="md"
          value={editPostPayload.title}
          placeholder="Title"
          onChange={event =>
            setEditPostPayload({ ...editPostPayload, title: event.currentTarget.value })
          }
        />
        <TextInput
          value={editPostPayload.description}
          placeholder="Description"
          onChange={event =>
            setEditPostPayload({ ...editPostPayload, description: event.currentTarget.value })
          }
        />
        <Button mt="md" onClick={onSubmitPost}>
          Edit
        </Button>
      </Modal>
    </>
  )
}
