import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { useLoginForm } from '../lib/use-login-form'

import classes from './login-form.module.css'

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm()

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Link to="/signup">Create account</Link>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form autoComplete="off" onSubmit={onSubmit}>
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            radius="md"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            withAsterisk
            mt="md"
            mb="xl"
            radius="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Link style={{ fontSize: '14px' }} to="/reset-password">
            Forgot password?
          </Link>

          <Button type="submit" fullWidth mt="xl" radius="md" loading={form.submitting}>
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
