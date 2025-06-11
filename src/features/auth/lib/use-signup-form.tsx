import { useForm } from '@mantine/form'

import type { TSignupPayload } from '~/shared/auth/auth.types'

export const useSignupForm = () => {
  const form = useForm<TSignupPayload>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  const submit = () => {}

  const onSubmit = form.onSubmit(submit)

  return { form, onSubmit }
}
