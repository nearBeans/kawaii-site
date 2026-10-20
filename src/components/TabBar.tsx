import { TABS } from '../content/site'
import { useTransition } from '../transition/useTransition'

export function TabBar() {
  const { location, navigate } = useTransition()

  return (
    <nav className="tabbar" aria-label="ページ">
      <ul className="tabbar__list">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path

          return (
            <li key={tab.id}>
              <a
                className={isActive ? 'tab is-active' : 'tab'}
                href={tab.path}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
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
                  navigate(tab.path)
                }}
              >
                <span className="tab__dot" aria-hidden="true" />
                <span className="tab__label">{tab.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
