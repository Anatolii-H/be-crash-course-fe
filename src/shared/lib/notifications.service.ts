import { notifications } from '@mantine/notifications'
import type { NotificationData, NotificationsStore } from '@mantine/notifications'
import type { MantineColor } from '@mantine/core'

type TNotificationType = 'success' | 'error'

type TShowAppNotificationProps = {
  type?: TNotificationType
}

const notificationTypeMapping: Record<TNotificationType, MantineColor> = {
  error: 'red',
  success: 'green'
}

const showAppNotification = (
  { type = 'success', ...props }: NotificationData & TShowAppNotificationProps,
  notificationsStore?: NotificationsStore
) => {
  return notifications.show(
    {
      color: notificationTypeMapping[type],
      ...props
    },
    notificationsStore
  )
}

const updateAppNotification = (
  { type = 'success', ...props }: NotificationData & TShowAppNotificationProps,
  notificationsStore?: NotificationsStore
) => {
  return notifications.update(
    {
      color: notificationTypeMapping[type],
      ...props
    },
    notificationsStore
  )
}

export const appNotifications = {
  ...notifications,
  show: showAppNotification,
  update: updateAppNotification
}
