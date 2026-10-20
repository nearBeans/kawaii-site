import { Page } from '../components/Page'
import { WORKS } from '../content/site'

export function Works() {
  return (
    <Page eyebrow="works" title="つくる" lead="つくったものを、すこしずつ。">
      <ul className="works">
        {WORKS.map((work) => (
          <li className="card work" key={work.name}>
            <span className="work__mark" aria-hidden="true" />
            <span className="work__body">
              <span className="work__name">{work.name}</span>
              <span className="work__desc">{work.description}</span>
            </span>
            <span className="work__tag">{work.kind}</span>
          </li>
        ))}
      </ul>
      <p className="page__note">つくりかけのものも、ここに増やしていきます。</p>
    </Page>
  )
}
