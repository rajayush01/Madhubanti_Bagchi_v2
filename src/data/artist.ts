import type { Link, Milestone } from '../types'

// All artist facts live in src/data. Every PLACEHOLDER value must be replaced
// with verified, artist-approved content before launch.
export const artist = {
  name: 'Madhubanti Bagchi',
  descriptor: 'Playback singer · Vocal artist',
  tagline: 'A voice that stays with you.',
  footerLine: 'Indian playback singer.',
  hero: {
    video: '/media/vid.mp4' as string | undefined, // PLACEHOLDER loop — replace with approved performance video
    poster: '/media/img1.jpg' as string | undefined, // still fallback / poster
    image: '/media/img2.jpg' as string | undefined, // PLACEHOLDER full-bleed portrait (desktop)
    mobileImage: '/media/img1.jpg' as string | undefined, // PLACEHOLDER vertical crop for phones
  },
  intro: {
    heading: 'A journey shaped by music.',
    body: [
      'PLACEHOLDER — replace with artist-approved biography copy.',
      'Keep it concise and only include verified facts.',
    ],
    collage: ['/media/img4.webp', '/media/img3.jpg', '/media/img8.jpeg'] as (string | undefined)[], // PLACEHOLDER — left, centre (large), right
  },
  featuredVideo: {
    title: 'Featured film',
    youtubeId: undefined as string | undefined, // official YouTube video id (takes priority over src)
    src: '/media/film-placeholder.mp4' as string | undefined, // PLACEHOLDER — approved mp4/webm
    poster: '/media/video-poster.svg' as string | undefined,
    credits: undefined as string | undefined,
  },
  contact: {
    email: undefined as string | undefined,
    management: undefined as string | undefined,
  },
  socials: [] as Link[], // verified profiles only
  streaming: [] as Link[], // official streaming profiles only
  privacyUrl: undefined as string | undefined,
}

export const milestones: Milestone[] = [
  { id: 'm1', period: 'Beginnings', title: 'Musical beginnings', text: 'PLACEHOLDER — to be supplied by the artist’s team.', placeholder: true },
  { id: 'm2', period: 'Training', title: 'Training and development', text: 'PLACEHOLDER — verified details only.', placeholder: true },
  { id: 'm3', period: 'Playback', title: 'Playback milestones', text: 'PLACEHOLDER — verified releases and credits.', placeholder: true },
  { id: 'm4', period: 'Now', title: 'Live and current projects', text: 'PLACEHOLDER — current work, once confirmed.', placeholder: true },
]
