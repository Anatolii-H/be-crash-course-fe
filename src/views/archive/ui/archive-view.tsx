import { useState } from 'react'

import { Container, Tabs } from '@mantine/core'
import { Navbar } from '~/widgets/navbar'
import { ArchiveSoftDeleteTable } from './archive-soft-delete-table'
import { ArchiveHardDeleteTable } from './archive-hard-delete-table'

type TActiveTabs = 'soft-deleted' | 'hard-deleted'

export const ArchiveView = () => {
  const [activeTab, setActiveTab] = useState<TActiveTabs>('soft-deleted')

  return (
    <div>
      <Navbar />

      <Container>
        <Tabs value={activeTab} onChange={value => setActiveTab(value as TActiveTabs)}>
          <Tabs.List>
            <Tabs.Tab value="soft-deleted">Soft deleted</Tabs.Tab>
            <Tabs.Tab value="hard-deleted">Hard deleted</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="soft-deleted">
            <ArchiveSoftDeleteTable />
          </Tabs.Panel>
          <Tabs.Panel value="hard-deleted">
            <ArchiveHardDeleteTable />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  )
}
