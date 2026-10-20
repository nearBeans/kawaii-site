import { Page } from '../components/Page'
import { LINKS } from '../content/site'

export function Connect() {
  return (
    <Page eyebrow="connect" title="つながる" lead="よかったら、どこかで。">
      <ul className="links">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="card link-card"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="link-card__body">
                <span className="link-card__label">{link.label}</span>
                <span className="link-card__handle">{link.handle}</span>
              </span>
              <span className="link-card__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="contact">
        <button
          className="button"
          type="button"
          disabled
          aria-describedby="contact-note"
        >
          お問い合わせ
        </button>
        <p className="contact__note" id="contact-note">
          いまは準備中です。
        </p>
      </div>
    </Page>
  )
}
