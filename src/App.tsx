import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { Header, VacancyList, VacancyDetail } from '@components/index'
import { NotFound } from './components/NotFound/NotFound'

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="/vacancies/moscow" element={<VacancyList />} />
          <Route path="/vacancies/petersburg" element={<VacancyList />} />
          <Route path="/vacancies/:id" element={<VacancyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
