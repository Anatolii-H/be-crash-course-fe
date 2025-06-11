import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { useSignupForm } from '../lib/use-signup-form'

import classes from './login-form.module.css'

export const SignupForm = () => {
  const { form, onSubmit } = useSignupForm()

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create Account!
      </Title>

      <Text className={classes.subtitle}>
        Have an account? <Link to="/login">Log in</Link>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form autoComplete="off" onSubmit={onSubmit}>
          <TextInput
            label="First Name"
            placeholder="First name"
            radius="md"
            withAsterisk
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
          />

          <TextInput
            label="Last Name"
            placeholder="Last Name"
            radius="md"
            mt="md"
            withAsterisk
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
          />

          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            radius="md"
            mt="md"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            withAsterisk
            mt="md"
            radius="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Button type="submit" fullWidth mt="xl" radius="md" loading={form.submitting}>
            Create account
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
