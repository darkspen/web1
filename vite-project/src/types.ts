export interface NewsItem {
  id: string
  title: string
  url: string
  source: string
  points: number
  comments: number
  publishedAt: Date
  snippet?: string
}

export type CategoryKey = 'ai' | 'semiconductor' | 'bigtech' | 'startup' | 'opensource' | 'featured'

export interface Category {
  key: CategoryKey
  label: string
  emoji: string
  color: string
  items: NewsItem[]
  loading: boolean
  error: string | null
}
