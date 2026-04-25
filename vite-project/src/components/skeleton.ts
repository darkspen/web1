export function renderSkeleton(count = 6): string {
  return Array.from({ length: count }, () => `
    <article class="news-card skeleton">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-meta"></div>
      <div class="skeleton-line skeleton-snippet"></div>
    </article>
  `).join('')
}
