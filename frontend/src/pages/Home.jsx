import { Typography } from '@mui/material'
import AboutSection from '../components/AboutSection'
import Hero from '../components/Hero'
import HorizontalScrollbarWithScroll from '../components/HorizontalScrollbarWithScroll'
import SearchExerciseLandingPageSection from '../components/SearchExerciseLandingPageSection'
import exercise from '../assets/images/exercise.jpg'
import exercise1 from '../assets/images/exercise1.jpg'

function Home() {
  const items = [
    { id: 'exercise', image: exercise, title: 'Jan' },
    { id: 'exercise1', image: exercise1, title: 'Adam' },
    { id: 'exercise2', image: exercise, title: 'Magda' },
    { id: 'exercise3', image: exercise1, title: 'Marek' },
    { id: 'exercise3', image: exercise1, title: 'Ania' },
  ]
  return (
    <>
      <Hero />
      <AboutSection />
      <SearchExerciseLandingPageSection />
      <Typography variant="h4" className="my-10 text-center" fontWeight={700}>
        Popular users
      </Typography>
      <HorizontalScrollbarWithScroll items={items} />
    </>
  )
}

export default Home
