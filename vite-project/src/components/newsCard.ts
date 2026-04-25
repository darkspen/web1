import type { NewsItem } from '../types'
import { relativeTime } from '../utils/format'

export function renderNewsCard(item: NewsItem): string {
  const meta = [
    `<span class="card-source">${item.source}</span>`,
    `<span class="card-time">${relativeTime(item.publishedAt)}</span>`,
    item.points > 0 ? `<span class="card-points">▲ ${item.points}</span>` : '',
    item.comments > 0 ? `<span class="card-comments">💬 ${item.comments}</span>` : '',
  ]
    .filter(Boolean)
    .join('<span class="card-sep">·</span>')

  return `
    <article class="news-card">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-title-link">
        <h3 class="card-title">${item.title}</h3>
      </a>
      <div class="card-meta">${meta}</div>
      ${item.snippet ? `<p class="card-snippet">${item.snippet}</p>` : ''}
    </article>
  `
}
