import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Exercises from './pages/Exercises'

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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/exercises" element={<Exercises />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
