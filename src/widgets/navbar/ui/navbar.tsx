import { useMemo, useState } from 'react'
import {
  Avatar,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core'
import { MantineLogo } from '@mantinex/mantine-logo'
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash
} from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'

import classes from './navbar.module.css'

import { authService } from '~/shared/auth/auth.service'
import { useAuthStore } from '~/shared/auth/auth.store'

const USER_IMAGE =
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'

const tabs = [
  { path: '/', title: 'Home' },
  { path: '/admin', title: 'Manage users', adminOnly: true },
  { path: '/tags', title: 'Manage tags', adminOnly: true },
  { path: '/archive', title: 'Archive', adminOnly: true }
]

export const Navbar = () => {
  const { navigate, parseLocation } = useRouter()
  const theme = useMantineTheme()
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const user = useAuthStore(state => state.userProfile)

  const pathname = useMemo(() => parseLocation().pathname, [parseLocation])

  const items = tabs
    .filter(tab => (tab.adminOnly ? user?.role === 'admin' : true))
    .map(tab => (
      <Tabs.Tab value={tab.path} key={tab.path}>
        {tab.title}
      </Tabs.Tab>
    ))

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group justify="space-between">
          <MantineLogo size={28} />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'scale-y', duration: 250 }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton className={clsx(classes.user, userMenuOpened && classes.userActive)}>
                <Group gap={7}>
                  <Avatar
                    src={USER_IMAGE}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />}
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={<IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />}
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />}
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} stroke={1.5} />}
                onClick={authService.logout}
              >
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>

      <Container>
        <Tabs
          variant="outline"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab
          }}
          value={pathname}
          onChange={value => navigate({ to: value ?? '.' })}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}
