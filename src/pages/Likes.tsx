import { Page } from '../components/Page'
import { LIKES } from '../content/site'

export function Likes() {
  return (
    <Page eyebrow="likes" title="すき" lead="すきなものは、ずっとすき。">
      <ul className="stickers">
        {LIKES.map((like) => (
          <li className="sticker" key={like.label}>
            <span className="sticker__mark" aria-hidden="true">
              {like.mark}
            </span>
            {like.label}
          </li>
        ))}
      </ul>
    </Page>
  )
}
