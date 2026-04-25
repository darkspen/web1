import './style.css'
import type { Category } from './types'
import { CATEGORIES } from './utils/categorize'
import { createStore } from './utils/state'
import { fetchHNCategory, resetSeenUrls } from './api/hn'
import { fetchFeatured } from './api/rss'
import { renderHeader, updateLastUpdated } from './components/header'
import { renderCategorySection } from './components/categorySection'

const categoriesStore = createStore<Category[]>(
  CATEGORIES.map(cfg => ({
    key: cfg.key,
    label: cfg.label,
    emoji: cfg.emoji,
    color: cfg.color,
    items: [],
    loading: true,
    error: null,
  }))
)

function updateCategory(key: string, patch: Partial<Category>) {
  categoriesStore.set(
    categoriesStore.get().map(c => (c.key === key ? { ...c, ...patch } : c))
  )
}

function renderSection(category: Category) {
  const el = document.getElementById(`category-${category.key}`)
  if (el) {
    el.outerHTML = renderCategorySection(category)
    attachRetryListeners()
  }
}

function attachRetryListeners() {
  document.querySelectorAll<HTMLButtonElement>('.retry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.category
      if (key) retryCategory(key)
    })
  })
}

async function retryCategory(key: string) {
  const cfg = CATEGORIES.find(c => c.key === key)
  if (!cfg) return
  updateCategory(key, { loading: true, error: null })
  renderSection(categoriesStore.get().find(c => c.key === key)!)
  await loadCategory(cfg.key, cfg.query)
}

async function loadCategory(key: string, query: string) {
  try {
    const items = key === 'featured' ? await fetchFeatured() : await fetchHNCategory(query)
    updateCategory(key, { items, loading: false, error: null })
  } catch (err) {
    updateCategory(key, { loading: false, error: String(err) })
  }
  const category = categoriesStore.get().find(c => c.key === key)!
  renderSection(category)
}

async function loadAll() {
  resetSeenUrls()

  categoriesStore.set(
    categoriesStore.get().map(c => ({ ...c, items: [], loading: true, error: null }))
  )

  const app = document.getElementById('app')!
  app.innerHTML =
    renderHeader(null) +
    '<main class="main-content">' +
    categoriesStore.get().map(renderCategorySection).join('') +
    '</main>'

  attachRetryListeners()

  document.getElementById('refresh-btn')?.addEventListener('click', () => loadAll())

  await Promise.allSettled(
    CATEGORIES.map(cfg => loadCategory(cfg.key, cfg.query))
  )

  updateLastUpdated(new Date())
}

loadAll()
setInterval(loadAll, 5 * 60 * 1000)
