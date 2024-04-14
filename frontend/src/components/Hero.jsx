import HeroContent from './HeroContent'
import ImageSection from './ImageSection'
import Navbar from './Navbar'

function Hero() {
  return (
    <header className="grid lg:grid-cols-2 bg-primary max-h-full relative">
      <div className="lg:order-last">
        <Navbar />
        <HeroContent />
      </div>
      <ImageSection />

    </header>

  )
}

export default Hero
