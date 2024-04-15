import HeroContent from './HeroContent'
import ImageSection from './ImageSection'
import Navbar from './Navbar'

function Hero() {
  return (
    <header className="grid lg:grid-cols-2 bg-primary min-h-[90vh] max-h-full relative pb-6">
      <div className="lg:order-last">
        <Navbar />
        <HeroContent />
      </div>
      <ImageSection />

    </header>

  )
}

export default Hero
