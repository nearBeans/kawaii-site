import type { CSSProperties } from 'react'
import { Chibi } from '../components/Chibi'
import { GREETINGS, HOME } from '../content/site'

const WORDMARK = HOME.wordmark.split('')

function greeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return GREETINGS.morning
  if (hour >= 11 && hour < 18) return GREETINGS.afternoon
  return GREETINGS.evening
}

export function Home() {
  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <span>{greeting()}</span>
            <span>welcome</span>
          </p>
          <h1
            className="hero__name"
            id="page-title"
            tabIndex={-1}
            aria-label={HOME.wordmark}
          >
            {WORDMARK.map((letter, index) => (
              <span
                className="hero__letter"
                key={`${letter}-${index}`}
                style={{ '--i': index } as CSSProperties}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}
            <span className="hero__dot" aria-hidden="true">
              .
            </span>
          </h1>
          <p className="hero__role">{HOME.role}</p>
          <p className="hero__lead">{HOME.lead}</p>
          <a
            className="hero__link"
            href={HOME.blog.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {HOME.noteLink}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero__character">
          <span className="hero__halo" aria-hidden="true" />
          <Chibi className="hero__chibi chibi--float" expression="happy" />
        </div>
      </section>

      <section className="home__row" aria-label="近況">
        <article className="card card--main home__note">
          <p className="card__label">ひとこと</p>
          <p className="card__text">{HOME.note}</p>
        </article>
        <a
          className="card card--link home__blog"
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
      </section>
    </div>
  )
}
