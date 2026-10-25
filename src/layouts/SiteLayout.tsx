import { Outlet } from 'react-router-dom'
import Nav from '../components/navigation/Nav'
import Footer from '../components/footer/Footer'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function SiteLayout() {
  useSmoothScroll()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <Nav />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
