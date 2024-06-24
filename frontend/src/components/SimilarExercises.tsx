import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import type { ExerciseModel } from '../models/ExerciseModel'
import HorizontalScrollbar from './HorizontalScrollbar'
import Loader from './Loader'
import { ClassNames } from '@emotion/react'

function SimilarExercises({
  targetMuscleExercises,
  equipmentExercises,
}: {
  targetMuscleExercises: ExerciseModel[]
  equipmentExercises: ExerciseModel[]
}) {
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0px' }, mb: '200px' }}>
      <Typography
        sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Similar{' '}
        <span
          style={{ textTransform: 'capitalize' }}
          className="text-secondary"
        >
          Target Muscle
        </span>{' '}
        exercises
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          {targetMuscleExercises.length !== 0 ? (
            <HorizontalScrollbar data={targetMuscleExercises} />
          ) : (
            <Loader />
          )}
        </Box>
      </Stack>
      <Typography
        sx={{
          fontSize: { lg: '44px', xs: '25px' },
          ml: '20px',
          mt: { lg: '100px', xs: '60px' },
        }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Similar{' '}
        <span
          style={{ textTransform: 'capitalize' }}
          className="text-secondary"
        >
          Equipment
        </span>{' '}
        exercises
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          {equipmentExercises.length !== 0 ? (
            <HorizontalScrollbar data={equipmentExercises} />
          ) : (
            <Loader />
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default SimilarExercises
