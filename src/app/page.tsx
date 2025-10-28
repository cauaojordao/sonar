import { AudioProcessingPage } from '@/components/audio-processing-page'
import { TimelineSection } from '@/components/timeline-section'

const Home = () => {
  return (
    <div className="flex flex-col gap-24">
      <AudioProcessingPage />
      <TimelineSection />
    </div>
  )
}

export default Home