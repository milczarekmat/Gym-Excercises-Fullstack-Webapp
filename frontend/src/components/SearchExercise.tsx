import { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { GetDataWithHeaders, externalApiOptions } from '../utils/apiCalls'
import { useExerciseStore } from '../stores/exerciseStore'
import HorizontalScrollbar from './HorizontalScrollbar'

function SearchExercises() {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([
    'all',
    'back',
    'cardio',
    'chest',
    'lower arms',
    'lower legs',
    'neck',
    'shoulders',
    'upper arms',
    'upper legs',
    'waist',
  ])

  const exerciseStore = useExerciseStore()

  // useEffect(() => {
  //   const fetchExercisesData = async () => {
  //     console.log('fetching body parts')
  //     const bodyPartsData = await GetDataWithHeaders(
  //       'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  //       externalApiOptions,
  //       false,
  //     )

  //     setBodyParts(['all', ...bodyPartsData])
  //   }

  //   fetchExercisesData()
  // }, [])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await GetDataWithHeaders(
        'https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=0',
        externalApiOptions,
        false,
      )

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search),
      )

      window.scrollTo({ top: 800, left: 100, behavior: 'smooth' })

      setSearch('')
      exerciseStore.setExercises(searchedExercises)
    }
  }

  // useEffect(() => {
  //   exerciseStore.setBodyPart(bodyParts[2])
  //   console.log('bodyParts', bodyParts)
  // }, [bodyParts])

  useEffect(() => {
    console.log(exerciseStore.bodyPart)
  }, [exerciseStore.bodyPart])

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center"
      >
        Exercises You
        <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          color="secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="hover:border-primary-600 border hover:border-solid hover:text-secondary"
          sx={{
            bgcolor: 'secondary.main',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            position: 'absolute',
            right: '0px',
            fontSize: { lg: '20px', xs: '14px' },
          }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={exerciseStore.setBodyPart}
          bodyPart={exerciseStore.bodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
