export type TourStatus = 'on-sale' | 'sold-out' | 'tba'

export interface TourDate {
  id: string
  /** ISO date, e.g. '2027-01-18'. Leave undefined while unconfirmed. */
  date?: string
  city: string
  venue: string
  ticketUrl?: string
  status?: TourStatus
  /** Visible placeholder only. Remove once real, verified dates are added. */
  placeholder?: boolean
}

// Only add verified dates here. Placeholders are clearly marked in the UI.
export const tours: TourDate[] = [
  { id: 'ph-1', city: 'City to be announced', venue: 'Venue to be announced', status: 'tba', placeholder: true },
  { id: 'ph-2', city: 'City to be announced', venue: 'Venue to be announced', status: 'tba', placeholder: true },
  { id: 'ph-3', city: 'City to be announced', venue: 'Venue to be announced', status: 'tba', placeholder: true },
]