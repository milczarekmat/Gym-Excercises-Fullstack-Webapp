import { TextField } from '@mui/material'

function SearchExercise() {
  return (
    <section id="search">
      <h1 className="text-3xl font-bold text-center my-6">Search for effective exercises</h1>
      <div className="flex justify-center">
        <TextField color="secondary" id="outlined-basic" label="Ex. bench press" variant="outlined" size="small" />
      </div>
    </section>
  )
}

export default SearchExercise
