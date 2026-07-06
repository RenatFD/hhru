import { AppShell } from '@mantine/core'
import { Header, VacancyList } from '@components/index'

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <VacancyList />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
