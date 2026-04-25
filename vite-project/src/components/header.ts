import { formatKoreanDate } from '../utils/format'

export function renderHeader(lastUpdated: Date | null): string {
  const dateStr = formatKoreanDate(new Date())
  const updatedStr = lastUpdated
    ? `마지막 업데이트: ${lastUpdated.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
    : '업데이트 중...'

  return `
    <header class="site-header">
      <div class="header-inner">
        <div class="header-title">
          <span class="header-logo">📡</span>
          <h1>테크 브리핑</h1>
        </div>
        <div class="header-meta">
          <span class="header-date">${dateStr}</span>
          <span class="header-updated" id="last-updated">${updatedStr}</span>
          <button class="refresh-btn" id="refresh-btn" title="새로고침">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
              <path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            </svg>
            새로고침
          </button>
        </div>
      </div>
    </header>
  `
}

export function updateLastUpdated(date: Date) {
  const el = document.getElementById('last-updated')
  if (el) {
    el.textContent = `마지막 업데이트: ${date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
  }
}
