import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Exercises from './pages/Exercises'
import Login from './pages/Login'
import Footer from './components/Footer'
import Register from './pages/Register'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e7d9c3',
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
        <Route
          element={
            <div>
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
