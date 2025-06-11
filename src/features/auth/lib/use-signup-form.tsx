import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { useNavigate } from '@tanstack/react-router'

import type { TSignupPayload } from '~/shared/auth/auth.types'
import { authService } from '~/shared/auth/auth.service'
import { appNotifications } from '~/shared/lib/notifications.service'
import { useAuthStore } from '~/shared/auth/auth.store'

export const useSignupForm = () => {
  const navigate = useNavigate()
  const initializeSession = useAuthStore(state => state.initializeSession)
  const form = useForm<TSignupPayload>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      email: isEmail(),
      password: isNotEmpty()
    }
  })

  const submit = async (values: TSignupPayload) => {
    try {
      await authService.signup(values, true)

      appNotifications.show({ message: 'Account created successfully' })

      await authService.login({ email: values.email, password: values.password })
      await initializeSession({ withLoadingOverlay: false })

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
