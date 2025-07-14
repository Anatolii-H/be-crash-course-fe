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

import { AppCardSkeleton } from '~/shared/ui/app-card-skeleton'
import { AppRender } from '~/shared/ui/app-render'
import { PostCard, useGetPosts, useCreatePost, useDeletePost, useEditPost } from '~/entities/post'
import type {
  TGetPostsRequestParametersSortBy,
  TGetPostsRequestParametersSortOrder
} from '~/entities/post'
import { Footer } from '~/widgets/footer'
import { Navbar } from '~/widgets/navbar'

import classes from './home-view.module.css'

export const HomeView = () => {
  const [search, setSearch] = useDebouncedState('', 300)
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 6 })
  const [sortBy, setSortBy] = useState<TGetPostsRequestParametersSortBy | null>(null)
  const [minCommentsCount, setMinCommentsCount] = useState<string | number>(0)
  const [sortOrder, setSortOrder] = useState<TGetPostsRequestParametersSortOrder>('asc')
  const [isCreatingPostMode, setIsCreatingPostMode] = useState(false)
  const [isPostModalOpened, { open: openPostModal, close: closePostModal }] = useDisclosure(false)
  const { mutateAsync: deletePost, isPending: isDeletingPost } = useDeletePost()
  const { mutateAsync: editPost, isPending: isEditingPost } = useEditPost()
  const { mutateAsync: createPost, isPending: isCreatingPost } = useCreatePost()

  const [editPostPayload, setEditPostPayload] = useState({
    title: '',
    description: '',
    id: ''
  })

  const {
    data,
    isLoading: isPostsLoading,
    isRefetching: isPostsRefetching,
    isFetched: isPostsFetched,
    refetch: refetchPosts
  } = useGetPosts({
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
    if (isCreatingPostMode) {
      await createPost(editPostPayload)
    } else {
      await editPost({ body: editPostPayload, dynamicKeys: { postId: editPostPayload.id } })
    }

    await refetchPosts()

    closePostModal()

    setIsCreatingPostMode(false)
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
                setIsCreatingPostMode(true)
                openPostModal()
              }}
            >
              Add new post
            </Button>

            <Box className={classes.blogWrapper}>
              <LoadingOverlay
                visible={(!isPostsFetched && !isPostsLoading) || isDeletingPost}
                overlayProps={{ radius: 'sm', blur: 2 }}
              />
              <AppCardSkeleton isLoading={isPostsLoading}>
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={async post => {
                      await deletePost({ postId: post.id })
                      await refetchPosts()
                    }}
                    onEdit={post => {
                      setEditPostPayload({
                        title: post.title,
                        description: post.description,
                        id: post.id
                      })

                      openPostModal()
                    }}
                  />
                ))}
              </AppCardSkeleton>
            </Box>

            <AppRender vIf={!posts.length && !isPostsLoading}>
              <Title ta="center">No posts found...</Title>
            </AppRender>

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
        opened={isPostModalOpened}
        onClose={() => {
          closePostModal()
          setEditPostPayload({ title: '', description: '', id: '' })
          setIsCreatingPostMode(false)
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
        <Button
          mt="md"
          onClick={onSubmitPost}
          loading={isCreatingPost || isPostsRefetching || isEditingPost}
        >
          {isCreatingPostMode ? 'Create' : 'Edit'}
        </Button>
      </Modal>
    </>
  )
}
