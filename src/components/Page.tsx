import type { ReactNode } from 'react'
import { Chibi, type ChibiExpression } from './Chibi'

type PageProps = {
  readonly eyebrow: string
  readonly title: string
  readonly lead?: string
  readonly expression?: ChibiExpression
  readonly children: ReactNode
}

/**
 * 各ページの骨格。見出し＋キャラ＋中身（SPEC §2）。
 * h1 は遷移後にフォーカスを受け取る（SPEC §8）。
 */
export function Page({
  eyebrow,
  title,
  lead,
  expression = 'normal',
  children,
}: PageProps) {
  return (
    <div className="page">
      <header className="page__head">
        <div className="page__headText">
          <p className="page__eyebrow">{eyebrow}</p>
          <h1 className="page__title" id="page-title" tabIndex={-1}>
            {title}
          </h1>
          {lead ? <p className="page__lead">{lead}</p> : null}
        </div>
        <Chibi className="page__chibi chibi--float" expression={expression} />
      </header>
      <div className="page__body">{children}</div>
    </div>
  )
}
