import type { Award } from '../types'
// Only verified awards and nominations. `placeholder: true` entries are layout
// samples — replace them with real, confirmed recognition.
export const awards: Award[] = [
  { id: 'a1', year: 'Year', title: 'Award name', category: 'Category', work: 'Song or film', placeholder: true },
  { id: 'a2', year: 'Year', title: 'Award name', category: 'Category', work: 'Song or film', placeholder: true },
  { id: 'a3', year: 'Year', title: 'Nomination name', category: 'Category', work: 'Song or film', placeholder: true },
]

// Featured award visual. Set `image` to a photo of a trophy/award (src/assets or /public);
// otherwise a placeholder laurel emblem is shown.
export const awardsFeature = { image: undefined as string | undefined, alt: 'Award trophy' }
