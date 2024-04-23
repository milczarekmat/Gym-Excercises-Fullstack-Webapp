import HeroContent from "./HeroContent";
import ImageSection from "./ImageSection";
import Navbar from "./Navbar";

function Hero() {
  return (
    <header className="relative grid max-h-full min-h-[90vh] bg-primary pb-6 lg:grid-cols-2">
      <div className="lg:order-last">
        <Navbar />
        <HeroContent />
      </div>
      <ImageSection />
    </header>
  );
}

export default Hero;
