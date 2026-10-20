import { Navigate, Route, Routes } from 'react-router'
import { Background } from './components/Background'
import { TabBar } from './components/TabBar'
import { usePageFocus } from './hooks/usePageFocus'
import { About } from './pages/About'
import { Connect } from './pages/Connect'
import { Home } from './pages/Home'
import { Likes } from './pages/Likes'
import { Works } from './pages/Works'

export default function App() {
  usePageFocus()

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        本文へ
      </a>
      <Background />
      <main className="app__main" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  )
}
