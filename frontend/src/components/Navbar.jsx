import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import { NavLink } from 'react-router-dom'

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
        <NavLink to="/">
          Home
        </NavLink>
        {/* <Link to="/about">About</Link> */}
        <NavLink to="/exercises">Browse exercises</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Stack>

      <Button variant="contained" color="secondary">Login</Button>
    </div>
  )
}

export default Navbar
