import { useForm } from '@mantine/form'
import { useNavigate } from '@tanstack/react-router'
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'

import type { TResetPasswordPayload } from '~/shared/auth/auth.types'
import { appNotifications } from '~/shared/lib/notifications.service'

export const useResetPasswordForm = (options: {
  activeStep: number
  setActiveStep?: (activeStep: number) => void
}) => {
  const navigate = useNavigate()
  const form = useForm<TResetPasswordPayload>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      confirmationCode: ''
    },
    validate: values => {
      if (options.activeStep === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email'
        }
      }

      if (options.activeStep === 1) {
        return {
          confirmationCode:
            values.confirmationCode.length !== 6 ? 'Code must include exactly 6 characters' : null,
          password:
            values.password.length < 8 ? 'Password must include at least 8 characters' : null
        }
      }

      return {}
    }
  })

  const submitEmailStep = async (values: TResetPasswordPayload) => {
    try {
      await resetPassword({
        username: values.email
      })

      options.setActiveStep?.(1)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'

      appNotifications.show({ message, type: 'error' })
    }
  }

  const submitNewPasswordStep = async (values: TResetPasswordPayload) => {
    try {
      await confirmResetPassword({
        confirmationCode: values.confirmationCode,
        newPassword: values.password,
        username: values.email
      })

      navigate({ to: '/login' })

      appNotifications.show({ message: 'Success. Password updated' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'

      appNotifications.show({ message, type: 'error' })
    }
  }

  const submit = async (values: TResetPasswordPayload) => {
    if (options.activeStep === 0) {
      await submitEmailStep(values)
    }

    if (options.activeStep === 1) {
      await submitNewPasswordStep(values)
    }
  }

  const onSubmit = form.onSubmit(submit)

  return { form, onSubmit }
}
