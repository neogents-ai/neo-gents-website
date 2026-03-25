import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PersonaPage from './pages/PersonaPage'
import PricingPage from './pages/PricingPage'
import SupporterPage from './pages/SupporterPage'
import AgentsPage from './pages/AgentsPage'
import { personas } from './data/personas'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {personas.map(p => (
            <Route key={p.id} path={p.route} element={<PersonaPage persona={p} />} />
          ))}
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/supporter" element={<SupporterPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
