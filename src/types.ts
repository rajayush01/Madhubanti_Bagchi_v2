export interface Link { label: string; href: string }
export interface Track {
  id: string; title: string; source: string; language: string
  year?: number; artwork?: string; previewUrl?: string; links: Link[]
  placeholder?: boolean
}
export interface LiveEvent {
  id: string; title: string; date: string; time?: string
  venue: string; city: string; poster?: string; ticketUrl?: string
  placeholder?: boolean
}
export interface GalleryItem {
  id: string; src?: string; alt: string; caption?: string
  ratio: 'portrait' | 'landscape' | 'square'
}
export interface PressItem {
  id: string; publication: string; title: string; date: string; url: string; thumbnail?: string
  placeholder?: boolean
}
export interface Award {
  id: string; year: string; title: string; category: string; work?: string
  result?: 'Won' | 'Nominated'; placeholder?: boolean
}
export interface Milestone { id: string; period: string; title: string; text: string; placeholder?: boolean }
