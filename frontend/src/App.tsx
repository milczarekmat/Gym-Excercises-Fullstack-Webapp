import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Footer from './components/Footer'
import Register from './pages/Register'
import BrowseExercises from './pages/BrowseExercises'
import ExerciseDetail from './pages/ExerciseDetail'
import TrainingTemplates from './pages/TrainingTemplates'

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
          <Route path="/exercises" element={<BrowseExercises />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/templates" element={<TrainingTemplates />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
