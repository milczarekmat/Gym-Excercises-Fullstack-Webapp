import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import type { ExerciseModel } from '../models/ExerciseModel'

function ExerciseCard({ exercise }: { exercise: ExerciseModel }) {
  return (
    <Link
      className="exercise-card"
      to={`/exercise/${exercise.id}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        style={{ width: '100%', height: 'auto' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)')
        }
      ></div>
      <Stack direction="row">
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#832b2b',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#af9d80',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
    </Link>
  )
}

export default ExerciseCard
