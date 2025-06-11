import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { useNavigate } from '@tanstack/react-router'

import { authService } from '~/shared/auth/auth.service'
import { appNotifications } from '~/shared/lib/notifications.service'
import { useAuthStore } from '~/shared/auth/auth.store'

import type { TLoginPayload } from '~/shared/auth/auth.types'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const initializeSession = useAuthStore(state => state.initializeSession)
  const form = useForm<TLoginPayload>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: isEmail(),
      password: isNotEmpty()
    }
  })

  const submit = async (values: TLoginPayload) => {
    try {
      await authService.login(values)
      await initializeSession({ withLoadingOverlay: false })

      appNotifications.show({ message: 'Logged in successfully' })

      navigate({ to: '/' })
    } catch (error) {
      if (error instanceof Error) {
        appNotifications.show({ message: error.message, type: 'error' })

        return
      }

      appNotifications.show({ message: 'Unexpected error', type: 'error' })
    }
  }

  const onSubmit = form.onSubmit(submit)

  return { form, onSubmit }
}
