import { Routes, Route, Navigate } from 'react-router-dom'
import { VacancyList, VacancyDetail } from '@components/index'
import { Layout } from './components/Layout/Layout'
import { NotFound } from './components/NotFound/NotFound'
import { About } from './components/About/About'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies/moscow" element={<VacancyList />} />
        <Route path="/vacancies/petersburg" element={<VacancyList />} />
        <Route path="/vacancies/:id" element={<VacancyDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
