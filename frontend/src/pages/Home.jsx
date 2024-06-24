import AboutSection from '../components/AboutSection'
import Hero from '../components/Hero'
import HorizontalScrollbarWithScroll from '../components/HorizontalScrollbarWithScroll'
import SearchExerciseLandingPageSection from '../components/SearchExerciseLandingPageSection'
import exercise from '../assets/images/exercise.jpg'
import exercise1 from '../assets/images/exercise1.jpg'

function Home() {
  const items = [
    { id: 'exercise', image: exercise, title: 'title' },
    { id: 'exercise1', image: exercise1, title: 'title' },
    { id: 'exercise2', image: exercise, title: 'title' },
    { id: 'exercise3', image: exercise1, title: 'title' },
    { id: 'exercise4', image: exercise, title: 'title' },
    { id: 'exercise5', image: exercise1, title: 'title' },
    { id: 'exercise6', image: exercise1, title: 'title' },
    { id: 'exercise7', image: exercise, title: 'title' },
    { id: 'exercise8', image: exercise1, title: 'title' },
  ]
  return (
    <>
      <Hero />
      <AboutSection />
      <SearchExerciseLandingPageSection />
      <HorizontalScrollbarWithScroll items={items} />
    </>
  )
}

export default Home
