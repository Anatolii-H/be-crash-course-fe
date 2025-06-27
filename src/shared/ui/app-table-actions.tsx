import type { ReactNode } from 'react'
import { ActionIcon, Menu, type MantineColor } from '@mantine/core'
import { IconDots, IconTrash } from '@tabler/icons-react'

type TActionName = string

type TTableAction<T extends TActionName> = {
  title: string
  action: T
  icon?: ReactNode
  color?: MantineColor
  disabled?: boolean
}

type TAppTableActionsProps<T extends TActionName> = {
  actions: TTableAction<T>[]
  showDelete?: boolean
  onDelete?: () => void
} & {
  [K in T as `on${Capitalize<K>}`]?: () => void
}

function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
}

export const AppTableActions = <T extends TActionName>({
  actions,
  onDelete,
  showDelete = true,
  ...handlers
}: TAppTableActionsProps<T>) => {
  return (
    <Menu
      width={200}
      withArrow
      position="right"
      zIndex={11}
      transitionProps={{ transition: 'pop' }}
    >
      <Menu.Target>
        <ActionIcon aria-label="Show options" variant="subtle" radius="xl">
          <IconDots size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map(({ title, action, icon, color, disabled }) => {
          const handler = handlers[`on${capitalize(action)}` as keyof typeof handlers]

          return (
            <Menu.Item
              key={action}
              onClick={() => (typeof handler === 'function' ? handler() : null)}
              leftSection={icon}
              color={color}
              disabled={disabled}
              style={{ fontWeight: 500 }}
            >
              {title}
            </Menu.Item>
          )
        })}

        {showDelete && (
          <>
            <Menu.Divider />

            <Menu.Item
              style={{ fontWeight: 500 }}
              onClick={() => onDelete?.()}
              color="red"
              leftSection={<IconTrash size={14} />}
            >
              Delete
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
