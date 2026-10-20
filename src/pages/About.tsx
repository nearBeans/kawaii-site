import { Page } from '../components/Page'
import { PROFILE } from '../content/site'

export function About() {
  return (
    <Page eyebrow="about" title="わたし" lead={PROFILE.intro}>
      <dl className="facts">
        {PROFILE.facts.map((fact) => (
          <div className="fact" key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="favorites">
        <p className="card__label">すきなもの</p>
        <ul className="stickers">
          {PROFILE.favorites.map((favorite) => (
            <li className="sticker sticker--plain" key={favorite}>
              {favorite}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
}
