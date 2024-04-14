import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className=" bg-primary font-bold flex lg:justify-around justify-between mt-7 mx-8 lg:mx-0 mb-6">
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        className="text-xl *:transition-transform transform hover:*:scale-110 hover:after:*:w-full"
      >
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to="/exercises">Browse exercises</Link>
        <Link to="/contact">Contact</Link>
      </Stack>

      <Button variant="contained" color="secondary">Login</Button>
    </div>
  )
}

export default Navbar
