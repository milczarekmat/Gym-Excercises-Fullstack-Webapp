import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Hero from './components/Hero'

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
    </ThemeProvider>
  )
}

export default App
