import { Link } from 'react-router-dom'
import { artist } from '../../data/artist'

const nav = ['about', 'music', 'videos', 'performances', 'gallery', 'press', 'contact']

export default function Footer() {
  const ext = [...artist.streaming, ...artist.socials]
  return (
    <footer className="bg-sand/40 px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl tracking-[0.12em]">{artist.name.toUpperCase()}</p>
          <p className="mt-3 text-charcoal/60">{artist.footerLine}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-3">
            {nav.map((id) => <li key={id}><Link to={`/#${id}`} className="label text-charcoal/70 hover:text-maroon">{id}</Link></li>)}
          </ul>
        </nav>
        {ext.length > 0 && (
          <ul className="space-y-3 md:col-span-3">
            {ext.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="label text-charcoal/70 hover:text-maroon">{l.label}</a></li>)}
          </ul>
        )}
      </div>
      <div className="mx-auto mt-14 flex max-w-[1500px] flex-wrap justify-between gap-4 border-t border-charcoal/15 pt-6 text-sm text-charcoal/50">
        <p>© {new Date().getFullYear()} {artist.name}. All rights reserved.</p>
        {artist.privacyUrl && <a href={artist.privacyUrl} className="hover:text-maroon">Privacy policy</a>}
      </div>
    </footer>
  )
}
