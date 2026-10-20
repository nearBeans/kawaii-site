import { Navigate, Route, Routes } from 'react-router'
import { Background } from './components/Background'
import { SiteHeader } from './components/SiteHeader'
import { usePageFocus } from './hooks/usePageFocus'
import { About } from './pages/About'
import { Connect } from './pages/Connect'
import { Home } from './pages/Home'
import { Likes } from './pages/Likes'
import { Works } from './pages/Works'
import { TransitionProvider } from './transition/TransitionProvider'
import { useTransition } from './transition/useTransition'

export default function App() {
  return (
    <TransitionProvider>
      <AppFrame />
    </TransitionProvider>
  )
}

function AppFrame() {
  const { location } = useTransition()
  usePageFocus(location.pathname)

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        本文へ
      </a>
      <Background />
      <SiteHeader />
      <main className="app__main" id="main" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>© 2026 mofh</p>
        <p>made with a chibi</p>
      </footer>
    </div>
  )
}
