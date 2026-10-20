/**
 * ちびキャラのプレースホルダー（SPEC §5）。
 * 発注したキャラが届いたら、このコンポーネントだけ差し替える。
 * 形は「丸い塊＋耳＋目」。輪郭は太め、影は1段。
 */

export type ChibiExpression = 'normal' | 'happy'

type ChibiProps = {
  readonly expression?: ChibiExpression
  readonly className?: string
}

export function Chibi({ expression = 'normal', className }: ChibiProps) {
  return (
    <svg
      className={className ? `chibi ${className}` : 'chibi'}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className="chibi__shadow" cx="100" cy="186" rx="46" ry="8" />
      <path className="chibi__tail" d="M142 156c20-4 30-18 24-32" />
      <circle className="chibi__ear" cx="68" cy="60" r="18" />
      <circle className="chibi__ear" cx="132" cy="60" r="18" />
      <circle className="chibi__earInner" cx="68" cy="60" r="8" />
      <circle className="chibi__earInner" cx="132" cy="60" r="8" />
      <ellipse className="chibi__body" cx="100" cy="150" rx="46" ry="38" />
      <ellipse className="chibi__paw" cx="80" cy="176" rx="13" ry="8" />
      <ellipse className="chibi__paw" cx="120" cy="176" rx="13" ry="8" />
      <ellipse className="chibi__head" cx="100" cy="94" rx="50" ry="44" />
      <ellipse className="chibi__blush" cx="64" cy="108" rx="9" ry="5" />
      <ellipse className="chibi__blush" cx="136" cy="108" rx="9" ry="5" />
      {expression === 'happy' ? (
        <>
          <path className="chibi__eye" d="M75 96q7-8 14 0" />
          <path className="chibi__eye" d="M111 96q7-8 14 0" />
          <path className="chibi__mouth" d="M91 108q9 9 18 0" />
        </>
      ) : (
        <>
          <circle className="chibi__eyeDot" cx="82" cy="96" r="5.5" />
          <circle className="chibi__eyeDot" cx="118" cy="96" r="5.5" />
          <path className="chibi__mouth" d="M95 108q5 5 10 0" />
        </>
      )}
    </svg>
  )
}
