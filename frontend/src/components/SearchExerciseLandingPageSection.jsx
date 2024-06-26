import { Button, TextField } from '@mui/material'
import heroImg from '../assets/images/exercise.jpg'
import { Link } from 'react-router-dom'

function SearchExerciseLandingPageSection() {
  return (
    <section className="mb-10 min-h-60 ">
      <div className="grid h-full min-h-52 sm:grid-cols-12">
        <div className="col-span-8 flex flex-col justify-center bg-primary ">
          <h1 className="my-6 text-center text-3xl font-bold">
            Search for effective exercises
          </h1>

          <div className="flex justify-center">
            <TextField
              color="secondary"
              disabled
              id="outlined-basic"
              label="Ex. bench press"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <Link to="/exercises">
              <Button size="large" color="secondary" variant="contained">
                Go over there
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-span-4 hidden sm:block">
          <img
            className="max-h-full max-w-full rounded-r-3xl"
            src={heroImg}
            alt="Hero image"
          />
        </div>
      </div>
    </section>
  )
}

export default SearchExerciseLandingPageSection
