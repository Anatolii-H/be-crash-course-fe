import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'

import type { TSignupPayload } from '~/shared/auth/auth.types'
import { authService } from '~/shared/auth/auth.service'
import { appNotifications } from '~/shared/lib/notifications.service'
import { useAuthStore } from '~/shared/auth/auth.store'
import { useCallback, useEffect } from 'react'

export const useSignupForm = () => {
  const navigate = useNavigate()
  const params = useSearch({ from: '/signup' })
  console.log('params', params)
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

  const init = useCallback(() => {
    if (params.email) {
      form.setFieldValue('email', params.email)
    }
  }, [form, params.email])

  const signup = async (values: TSignupPayload) => {
    try {
      await authService.signup(values, true)

      appNotifications.show({ message: 'Account created successfully' })

      await authService.login({ email: values.email, password: values.password })
      await initializeSession({ withLoadingOverlay: false })

      navigate({ to: '/' })
    } catch (error) {
      if (error instanceof AxiosError) {
        appNotifications.show({ message: error.response?.data?.message, type: 'error' })

        return
      }

      appNotifications.show({ message: 'Unexpected error', type: 'error' })
    }
  }

  const acceptInvitation = async (values: TSignupPayload) => {
    if (!params.expireAt || !params.signature) {
      return
    }

    try {
      await authService.acceptInvitation(
        { ...values, expireAt: params.expireAt, signature: params.signature },
        true
      )

      appNotifications.show({ message: 'Account activated' })

      await authService.login({ email: values.email, password: values.password })
      await initializeSession({ withLoadingOverlay: false })

      navigate({ to: '/' })
    } catch (error) {
      if (error instanceof AxiosError) {
        appNotifications.show({ message: error.response?.data?.message, type: 'error' })

        return
      }

      appNotifications.show({ message: 'Unexpected error', type: 'error' })
    }
  }

  const submit = async (values: TSignupPayload) => {
    if (params.signature) {
      await acceptInvitation(values)
    } else {
      await signup(values)
    }
  }

  const onSubmit = form.onSubmit(submit)

  useEffect(() => {
    init()
  }, [init])

  return { form, onSubmit }
}
