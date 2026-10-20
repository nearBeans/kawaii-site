import { NavLink } from 'react-router'
import { TABS } from '../content/site'

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="ページ">
      <ul className="tabbar__list">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <NavLink
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) =>
                isActive ? 'tab is-active' : 'tab'
              }
            >
              <span className="tab__dot" aria-hidden="true" />
              <span className="tab__label">{tab.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
