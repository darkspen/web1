import type { Category } from '../types'
import { renderNewsCard } from './newsCard'
import { renderSkeleton } from './skeleton'

export function renderCategorySection(category: Category): string {
  let content: string

  if (category.loading) {
    content = `<div class="card-grid">${renderSkeleton(6)}</div>`
  } else if (category.error) {
    content = `
      <div class="category-error">
        <p>데이터를 불러올 수 없습니다.</p>
        <button class="retry-btn" data-category="${category.key}">다시 시도</button>
      </div>
    `
  } else if (category.items.length === 0) {
    content = `<div class="category-empty">뉴스를 찾을 수 없습니다.</div>`
  } else {
    content = `<div class="card-grid">${category.items.map(renderNewsCard).join('')}</div>`
  }

  const badge = category.loading ? '' : `<span class="category-badge">${category.items.length}</span>`

  return `
    <section class="category-section" id="category-${category.key}" data-category="${category.key}">
      <details open>
        <summary class="category-header" style="--category-color: ${category.color}">
          <span class="category-emoji">${category.emoji}</span>
          <span class="category-label">${category.label}</span>
          ${badge}
          <span class="category-arrow">›</span>
        </summary>
        <div class="category-content">
          ${content}
        </div>
      </details>
    </section>
  `
}
