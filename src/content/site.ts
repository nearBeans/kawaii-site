/**
 * 画面に出す文言とリンク。
 * いまは仮データ（SPEC §6）。確定稿ができたら、このファイルだけ差し替える。
 */

export type TabId = 'home' | 'about' | 'works' | 'likes' | 'connect'

export type Tab = {
  readonly id: TabId
  readonly label: string
  readonly path: string
}

export const TABS: readonly Tab[] = [
  { id: 'home', label: 'ホーム', path: '/' },
  { id: 'about', label: 'わたし', path: '/about' },
  { id: 'works', label: 'つくる', path: '/works' },
  { id: 'likes', label: 'すき', path: '/likes' },
  { id: 'connect', label: 'つながる', path: '/connect' },
]

export const PROFILE = {
  handles: 'mofh / Beans',
  intro: 'ふだんは高校生。ちいさなものをつくっています。',
  facts: [
    { label: 'よび方', value: 'mofh / Beans' },
    { label: '生年月日', value: '2010.12.06' },
    { label: '住まい', value: '千葉' },
    { label: 'がくせい', value: '高校生' },
  ],
  favorites: ['テト', '音楽', '旅'],
} as const

export const HOME = {
  wordmark: 'mofh',
  role: 'student / maker',
  lead: 'ちいさなものをつくっています。ちびキャラと一緒に、ふわふわした場所を。',
  noteLink: 'note を読む',
  note: 'いまは、このサイトを組み立てているところ。',
  blog: {
    label: '最新のブログ',
    text: 'note に近況を書きました',
    href: 'https://note.com/eating_mame',
  },
} as const

export const GREETINGS = {
  morning: 'おはよう',
  afternoon: 'こんにちは',
  evening: 'こんばんは',
} as const

export type Work = {
  readonly name: string
  readonly description: string
  readonly kind: string
}

export const WORKS: readonly Work[] = [
  {
    name: 'comic-wiki',
    description: '読んだマンガの感想をまとめる個人用のWiki',
    kind: 'Web',
  },
  {
    name: 'JTale',
    description: '物語を書くためのちいさなツール',
    kind: 'Web',
  },
  {
    name: 'プリント管理',
    description: '学校のプリントを整理するアプリ',
    kind: 'アプリ',
  },
]

export type Like = {
  readonly mark: string
  readonly label: string
  readonly description: string
}

export const LIKES: readonly Like[] = [
  {
    mark: '🐈',
    label: 'テト',
    description: 'いっしょに暮らしている猫。',
  },
  {
    mark: '🎬',
    label: 'アニメ（百合）',
    description: 'すきなジャンル。視聴メモは Airtable。',
  },
  {
    mark: '⛰️',
    label: '山梨・長野',
    description: '自然のなかへ出かけるのがすき。',
  },
  {
    mark: '🗻',
    label: '富士山',
    description: 'まわりを歩くのがすき。',
  },
  {
    mark: '🎧',
    label: '音楽',
    description: '作業のおともに。',
  },
  {
    mark: '🕶️',
    label: 'VRChat',
    description: 'アバターで過ごす時間。',
  },
]

export type Link = {
  readonly label: string
  readonly handle: string
  readonly href: string
}

export const LINKS: readonly Link[] = [
  {
    label: 'X（メイン）',
    handle: '@beans_hp0',
    href: 'https://x.com/beans_hp0',
  },
  {
    label: 'X（学生）',
    handle: '@tyn_mame',
    href: 'https://x.com/tyn_mame',
  },
  {
    label: 'note',
    handle: '@eating_mame',
    href: 'https://note.com/eating_mame',
  },
  {
    label: '前のサイト',
    handle: 'mofh.dev',
    href: 'https://mofh.dev',
  },
]
