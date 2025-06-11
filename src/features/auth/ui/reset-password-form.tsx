import { Button, Container, Paper, Text, TextInput, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { useLoginForm } from '../lib/use-login-form'

import classes from './login-form.module.css'

export const ResetPasswordForm = () => {
  const { form, onSubmit } = useLoginForm()

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Reset password
      </Title>

      <Text className={classes.subtitle}>Enter your email</Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form autoComplete="off" onSubmit={onSubmit}>
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            radius="md"
            mb="md"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <Link style={{ fontSize: '14px' }} to="/login">
            Back to log in
          </Link>

          <Button type="submit" fullWidth mt="xl" radius="md" loading={form.submitting}>
            Reset
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
