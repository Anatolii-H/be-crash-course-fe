import { useForm } from '@mantine/form'

import type { TLoginPayload } from '~/shared/auth/auth.types'

export const useLoginForm = () => {
  const form = useForm<TLoginPayload>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    }
  })

  const submit = () => {}

  const onSubmit = form.onSubmit(submit)

  return { form, onSubmit }
}
