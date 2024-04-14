import HeroContent from './HeroContent'
import ImageSection from './ImageSection'
import Navbar from './Navbar'

function Hero() {
  return (
    <header className="grid sm:grid-cols-2 bg-primary">
      <ImageSection />
      <div>
        <Navbar />
        <HeroContent />
      </div>
    </header>

  )
}

export default Hero
