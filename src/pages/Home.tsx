import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import AboutSection from '../sections/AboutSection'
import MusicSection from '../sections/MusicSection'
// import FeaturedVideoSection from '../sections/FeaturedVideoSection'
// import JourneySection from '../sections/JourneySection'
import PerformancesSection from '../sections/PerformancesSection'
// import GallerySection from '../sections/GallerySection'
// import PressSection from '../sections/PressSection'
import ContactSection from '../sections/ContactSection'
import ImageMarquee from '../components/gallery/ImageMarquee'
import { scrollToId } from '../utils/scroll'
import BagchiLive from '../sections/BagchiLive'
// import UpcomingTours from '../sections/UpcomingTours'

export default function Home() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => scrollToId(hash.slice(1)), 150)
    return () => clearTimeout(t)
  }, [hash])
  return (
    <>
      <Hero />
      <AboutSection />
      <MusicSection />
      {/* <FeaturedVideoSection /> */}
      {/* <JourneySection /> */}
      <PerformancesSection />
      {/* <GallerySection /> */}
      <BagchiLive/>
      {/* <PressSection /> */}
      <ImageMarquee />
      <ContactSection />
    </>
  )
}
