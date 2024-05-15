import AboutSection from '../components/AboutSection'
import Hero from '../components/Hero'
import PopularExercises from '../components/PopularExercises'
import SearchExercise from '../components/SearchExercise'

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SearchExercise />
      <PopularExercises />
    </>
  )
}

export default Home
