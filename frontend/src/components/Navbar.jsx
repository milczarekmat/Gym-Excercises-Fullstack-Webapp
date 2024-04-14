import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className=" bg-primary font-bold flex justify-around mt-10">
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/exercises">Browse exercises</Link>
      </Stack>

      <Button variant="contained" color="secondary">Login</Button>
    </div>
  )
}

export default Navbar
