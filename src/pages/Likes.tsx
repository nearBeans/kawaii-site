import { Page } from '../components/Page'
import { LIKES } from '../content/site'

export function Likes() {
  return (
    <Page eyebrow="likes" title="すき" lead="すきなものは、ずっとすき。">
      <ul className="like-grid">
        {LIKES.map((like) => (
          <li className="card like-card" key={like.label}>
            <span className="like-card__mark" aria-hidden="true">
              {like.mark}
            </span>
            <span className="like-card__label">{like.label}</span>
            <span className="like-card__desc">{like.description}</span>
          </li>
        ))}
      </ul>
      <p className="page__note">すきなものは、まだまだ増えます。</p>
    </Page>
  )
}
