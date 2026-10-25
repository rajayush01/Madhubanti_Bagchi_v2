import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="label text-maroon">404</p>
      <h1 className="display mt-4 text-5xl md:text-8xl">This page is out of tune.</h1>
      <p className="mt-6 text-charcoal/70">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn mt-10 bg-ink text-ivory hover:bg-maroon">Back to home</Link>
    </section>
  )
}
