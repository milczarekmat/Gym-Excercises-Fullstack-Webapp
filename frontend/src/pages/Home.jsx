import AboutSection from '../components/AboutSection'
import Hero from '../components/Hero'
import PopularExercises from '../components/PopularExercises'
import SearchExerciseLandingPageSection from '../components/SearchExerciseLandingPageSection'

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SearchExerciseLandingPageSection />
      <PopularExercises />
    </>
  )
}

export default Home
