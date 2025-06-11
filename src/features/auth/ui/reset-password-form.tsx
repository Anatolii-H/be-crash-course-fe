import {
  Button,
  Container,
  Paper,
  Text,
  TextInput,
  Title,
  Stepper,
  PasswordInput
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { useResetPasswordForm } from '../lib/use-reset-password-form'

import classes from './login-form.module.css'

export const ResetPasswordForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { form, onSubmit } = useResetPasswordForm({ activeStep, setActiveStep })

  return (
    <Container size={500} my={40}>
      <Title ta="center" className={classes.title}>
        Reset password
      </Title>

      <Text className={classes.subtitle}>Enter your email</Text>

      <form autoComplete="off" onSubmit={onSubmit}>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <Stepper active={activeStep}>
            <Stepper.Step
              label="First step"
              description="Submit your email"
              loading={activeStep === 0 && form.submitting}
            >
              <TextInput
                label="Email"
                placeholder="example@gmail.com"
                radius="md"
                mb="md"
                withAsterisk
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              description="Create new password"
              loading={activeStep === 1 && form.submitting}
            >
              <TextInput
                label="Code"
                placeholder="6 digits code"
                radius="md"
                mb="md"
                withAsterisk
                key={form.key('confirmationCode')}
                {...form.getInputProps('confirmationCode')}
              />

              <PasswordInput
                label="Password"
                placeholder="Your new password"
                withAsterisk
                mt="md"
                mb="xl"
                radius="md"
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
            </Stepper.Step>
          </Stepper>

          <Link style={{ fontSize: '14px' }} to="/login">
            Back to log in
          </Link>

          <Button type="submit" fullWidth mt="xl" radius="md" loading={form.submitting}>
            Reset
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
