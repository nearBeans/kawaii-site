import type { MouseEvent } from 'react'
import { TABS } from '../content/site'
import { useTransition } from '../transition/useTransition'

/** 上部ナビ（SPEC §2.1）。現在地はピンクのピルで示す。 */
export function SiteHeader() {
  const { location, navigate } = useTransition()

  const handleClick = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigate(path)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <nav className="site-nav" aria-label="ページ">
          <ul className="site-nav__list">
            {TABS.map((tab) => {
              const isActive = location.pathname === tab.path

              return (
                <li key={tab.id}>
                  <a
                    className={
                      isActive ? 'site-nav__link is-active' : 'site-nav__link'
                    }
                    href={tab.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={handleClick(tab.path)}
                  >
                    {tab.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <a
          className="site-brand"
          href="/"
          aria-label="mofh のホームへ"
          onClick={handleClick('/')}
        >
          mofh<span aria-hidden="true">.</span>
        </a>
      </div>
    </header>
  )
}
