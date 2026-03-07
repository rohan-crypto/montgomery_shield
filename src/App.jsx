import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Overview from './pages/Overview'
import Emergency from './pages/Emergency'
import Neighbourhood from './pages/Neighbourhood'
import Economic from './pages/Economic'
import Stations from './pages/Stations'
import LiveNewsFeed from './components/ui/LiveNewsFeed'
import AIChatWidget from './components/ui/AIChatWidget'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 bg-slate-900">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/neighbourhood" element={<Neighbourhood />} />
              <Route path="/economic" element={<Economic />} />
              <Route path="/stations" element={<Stations />} />
            </Routes>
          </main>
        </div>
        <LiveNewsFeed />
        <AIChatWidget />
      </div>
    </BrowserRouter>
  )
}
