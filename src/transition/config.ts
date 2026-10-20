import { TABS } from '../content/site'

/** 遷移の基準値（docs/MOTION.md §8）。 */
export const TRANSITION = {
  angle: 8,
  stagger: 30,
  cover: 200, // 帯1本の長さ
  coverTotal: 260, // cover + stagger * 2
  hold: 240,
  holdFast: 120, // 早送り時
  reveal: 160, // 帯1本の長さ
  revealTotal: 220, // reveal + stagger * 2
  total: 720,
} as const

export type Phase = 'idle' | 'cover' | 'hold' | 'reveal'
export type Direction = 'forward' | 'backward'

const ORDER = ['/', '/about', '/works', '/likes', '/connect'] as const

/** タブの並び順で方向を決める（MOTION §6 URL と履歴）。 */
export function directionTo(from: string, to: string): Direction {
  const fromIndex = ORDER.indexOf(from as (typeof ORDER)[number])
  const toIndex = ORDER.indexOf(to as (typeof ORDER)[number])
  if (fromIndex === -1 || toIndex === -1) return 'forward'
  return toIndex > fromIndex ? 'forward' : 'backward'
}

/** 看板に出すページ名。未知のパスはホーム扱い。 */
export function labelFor(path: string): string {
  return TABS.find((tab) => tab.path === path)?.label ?? 'ホーム'
}
