import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Stack, Typography } from '@mui/material'
import { useExerciseStore } from '../stores/exerciseStore'
import { GetDataWithHeaders, exerciseOptions } from '../utils/apiCalls'
import ExerciseCard from './ExerciseCard'
import Loader from './Loader'

function Exercises() {
  const [currentPage, setCurrentPage] = useState(1)
  const [exercisesPerPage] = useState(6)

  const exerciseStore = useExerciseStore()

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = []

      if (exerciseStore.bodyPart === 'all') {
        exercisesData = await GetDataWithHeaders(
          'https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=0',
          exerciseOptions,
          false,
        )
      } else {
        exercisesData = await GetDataWithHeaders(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exerciseStore.bodyPart}?offset=0&limit=0`,
          exerciseOptions,
          false,
        )
      }

      exerciseStore.setExercises(exercisesData)
    }

    fetchExercisesData()
  }, [exerciseStore.bodyPart])

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage

  const currentExercises = exerciseStore.exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  )

  const paginate = (event, value) => {
    setCurrentPage(value)

    window.scrollTo({ top: 800, behavior: 'smooth' })
  }

  if (!currentExercises.length) return <Loader />

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="46px"
      >
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: '107px', xs: '50px' } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exerciseStore.exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exerciseStore.exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            className="mb-16"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises
