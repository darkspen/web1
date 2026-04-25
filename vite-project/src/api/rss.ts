import type { NewsItem } from '../types'
import { extractDomain } from '../utils/format'

const RSS_FEEDS = [
  'https://www.theverge.com/rss/index.xml',
  'https://feeds.feedburner.com/TechCrunch',
]

interface RSSItem {
  title: string
  link: string
  description?: string
  pubDate?: string
  guid?: string
}

interface RSSResponse {
  status: string
  items: RSSItem[]
}

export async function fetchFeatured(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(feed =>
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&count=8`)
        .then(r => r.json() as Promise<RSSResponse>)
    )
  )

  const items: NewsItem[] = []
  const seenLinks = new Set<string>()

  for (const result of results) {
    if (result.status !== 'fulfilled' || result.value.status !== 'ok') continue
    for (const item of result.value.items) {
      if (!item.link || seenLinks.has(item.link)) continue
      seenLinks.add(item.link)
      items.push({
        id: item.guid ?? item.link,
        title: item.title,
        url: item.link,
        source: extractDomain(item.link),
        points: 0,
        comments: 0,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        snippet: item.description?.replace(/<[^>]+>/g, '').slice(0, 120) || undefined,
      })
    }
  }

  return items.slice(0, 8)
}
