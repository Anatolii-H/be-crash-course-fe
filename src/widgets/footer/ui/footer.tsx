import { Container, Group } from '@mantine/core'
import { MantineLogo } from '@mantinex/mantine-logo'
import { Link } from '@tanstack/react-router'

import classes from './footer.module.css'

const links = [
  { path: '/', title: 'Home' },
  { path: '/account', title: 'Account' }
]

export const Footer = () => {
  const items = links.map(link => (
    <Link className={classes.link} to={link.path} key={link.path}>
      {link.title}
    </Link>
  ))

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <MantineLogo size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  )
}
