import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PersonaPage from './pages/PersonaPage'
import PricingPage from './pages/PricingPage'
import SupporterPage from './pages/SupporterPage'
import AgentsPage from './pages/AgentsPage'
import WaitlistPage from './pages/WaitlistPage'
import IntroSessionPage from './pages/IntroSessionPage'
import ComingSoonPage from './pages/ComingSoonPage'
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
          {/* Legacy persona routes → two-profile IA */}
          <Route path="/students"    element={<Navigate to="/soulfood-sushi" replace />} />
          <Route path="/parents"     element={<Navigate to="/soulfood-sushi" replace />} />
          <Route path="/solopreneur" element={<Navigate to="/nori" replace />} />
          <Route path="/creators"    element={<Navigate to="/nori" replace />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/supporter" element={<SupporterPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/intro-session" element={<IntroSessionPage />} />
          <Route path="/faq"      element={<ComingSoonPage title="FAQ" />} />
          <Route path="/careers"  element={<ComingSoonPage title="Careers" />} />
          <Route path="/contact"  element={<ComingSoonPage title="Contact" />} />
          <Route path="/privacy"  element={<ComingSoonPage title="Privacy Policy" />} />
          <Route path="/terms"    element={<ComingSoonPage title="Terms of Service" />} />
          <Route path="*"         element={<ComingSoonPage title="404 — Page Not Found" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
