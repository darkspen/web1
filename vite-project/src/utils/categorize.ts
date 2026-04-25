import type { CategoryKey } from '../types'

export interface CategoryConfig {
  key: CategoryKey
  label: string
  emoji: string
  color: string
  query: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'featured',
    label: '주요 뉴스',
    emoji: '⭐',
    color: '#1d4ed8',
    query: '',
  },
  {
    key: 'ai',
    label: 'AI',
    emoji: '🤖',
    color: '#7c3aed',
    query: 'AI LLM GPT Claude Gemini OpenAI Anthropic machine learning',
  },
  {
    key: 'semiconductor',
    label: '반도체',
    emoji: '💾',
    color: '#0369a1',
    query: 'semiconductor TSMC Nvidia chip GPU AMD Intel HBM wafer fab',
  },
  {
    key: 'bigtech',
    label: '빅테크',
    emoji: '🏢',
    color: '#047857',
    query: 'Google Apple Microsoft Meta Amazon Tesla earnings revenue',
  },
  {
    key: 'startup',
    label: '스타트업',
    emoji: '🚀',
    color: '#b45309',
    query: 'startup funding series venture capital YC unicorn IPO',
  },
  {
    key: 'opensource',
    label: '오픈소스',
    emoji: '🌐',
    color: '#be185d',
    query: 'open source release github framework library developer tools',
  },
]
