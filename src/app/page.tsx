import {HeroSection} from '@/components/layouts/hero-section'
import { TimelineSection } from '@/components/layouts/timeline-section'

const Home = () => {
  return (
    <div className="flex flex-col gap-24">
      <HeroSection />
      <TimelineSection />
    </div>
  )
}

export default Home