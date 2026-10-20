import { Page } from '../components/Page'
import { HOME, PROFILE } from '../content/site'

function greeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return 'おはよう'
  if (hour >= 11 && hour < 18) return 'こんにちは'
  return 'こんばんは'
}

export function Home() {
  return (
    <Page
      eyebrow="home"
      title={greeting()}
      lead="ちびキャラと一緒に、ふわふわした場所をつくっています。"
      expression="happy"
    >
      <div className="card card--main">
        <p className="card__label">ひとこと</p>
        <p className="card__text">{HOME.note}</p>
      </div>
      <a
        className="card card--link"
        href={HOME.blog.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <p className="card__label">{HOME.blog.label}</p>
        <p className="card__text">{HOME.blog.text}</p>
        <span className="card__arrow" aria-hidden="true">
          →
        </span>
      </a>
      <p className="page__signature">{PROFILE.handles}</p>
    </Page>
  )
}
