import { useForm } from '@mantine/form'

import type { TResetPasswordPayload } from '~/shared/auth/auth.types'

export const useResetPasswordForm = () => {
  const form = useForm<TResetPasswordPayload>({
    mode: 'uncontrolled',
    initialValues: {
      email: ''
    }
  })

  const submit = () => {}

  const onSubmit = form.onSubmit(submit)

  return { form, onSubmit }
}
