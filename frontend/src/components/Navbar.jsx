import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className=" mx-8 mb-6 mt-7 flex justify-between bg-primary font-bold lg:mx-0 lg:justify-around">
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        className="transform text-xl *:transition-transform hover:*:scale-110 hover:after:*:w-full"
      >
        <NavLink to="/">Home</NavLink>
        {/* <Link to="/about">About</Link> */}
        <NavLink to="/exercises">Browse exercises</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Stack>

      <Button variant="contained" color="secondary">
        Login
      </Button>
    </div>
  );
}

export default Navbar;
