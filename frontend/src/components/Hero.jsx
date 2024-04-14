import HeroContent from './HeroContent'
import ImageSection from './ImageSection'
import Navbar from './Navbar'

function Hero() {
  return (
    <header className="grid sm:grid-cols-2">
      <ImageSection />
      <section>
        <Navbar />
        <HeroContent />
      </section>
    </header>

  )
}

export default Hero
