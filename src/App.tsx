import './app.css'

const SWATCHES = [
  { name: 'base', value: 'var(--color-base)' },
  { name: 'main', value: 'var(--color-main)' },
  { name: 'sub', value: 'var(--color-sub)' },
  { name: 'accent', value: 'var(--color-accent)' },
] as const

export default function App() {
  return (
    <main className="shell">
      <p className="shell__eyebrow">kawaii-site</p>
      <h1 className="shell__title" tabIndex={-1}>
        足場だけできています
      </h1>
      <p className="shell__note">
        5画面とワイプ遷移、ちびキャラはこれから。色はトークンで確認できます。
      </p>
      <ul className="swatches">
        {SWATCHES.map((swatch) => (
          <li key={swatch.name} className="swatch">
            <span className="swatch__chip" style={{ background: swatch.value }} />
            <span className="swatch__name">{swatch.name}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
