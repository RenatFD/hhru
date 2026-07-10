import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { Header, VacancyList, VacancyDetail } from '@components/index'

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="/vacancies" element={<VacancyList />} />
          <Route path="/vacancies/:id" element={<VacancyDetail />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
