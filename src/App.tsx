import { AppShell } from '@mantine/core'
import { Header } from './components/Header'
import { VacancyList } from './components/VacancyList'

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
