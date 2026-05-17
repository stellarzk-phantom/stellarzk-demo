import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Demo from './pages/Demo'
import ProofsPage from './pages/ProofsPage'
import CircuitsPage from './pages/CircuitsPage'
import PrivacyPage from './pages/PrivacyPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/proofs" element={<ProofsPage />} />
        <Route path="/circuits" element={<CircuitsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </Layout>
  )
}
