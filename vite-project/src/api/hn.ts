import type { NewsItem } from '../types'
import { extractDomain } from '../utils/format'

interface HNHit {
  objectID: string
  title: string
  url?: string
  points: number
  num_comments: number
  created_at: string
  story_text?: string
}

const seenUrls = new Set<string>()

export function resetSeenUrls() {
  seenUrls.clear()
}

export async function fetchHNCategory(query: string): Promise<NewsItem[]> {
  const params = new URLSearchParams({
    tags: 'story',
    query,
    hitsPerPage: '15',
    numericFilters: 'points>5',
  })

  const res = await fetch(`https://hn.algolia.com/api/v1/search?${params}`)
  if (!res.ok) throw new Error(`HN API error: ${res.status}`)

  const data = await res.json()
  const items: NewsItem[] = []

  for (const hit of data.hits as HNHit[]) {
    const url = hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`
    if (seenUrls.has(url)) continue
    seenUrls.add(url)

    items.push({
      id: hit.objectID,
      title: hit.title,
      url,
      source: extractDomain(url),
      points: hit.points ?? 0,
      comments: hit.num_comments ?? 0,
      publishedAt: new Date(hit.created_at),
      snippet: hit.story_text?.replace(/<[^>]+>/g, '').slice(0, 120) || undefined,
    })
  }

  return items.slice(0, 12)
}
