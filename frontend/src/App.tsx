import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Hero from './components/Hero'
import SearchExercise from './components/SearchExercise'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#4c0000',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hero />
      <AboutSection />
      <SearchExercise />
      <Footer />
    </ThemeProvider>
  )
}

export default App
