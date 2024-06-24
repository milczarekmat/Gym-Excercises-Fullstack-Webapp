import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'
import NavbarGuest from '../components/NavbarGuest'
import ExerciseCard from '../components/ExerciseCard'
import { Box, Button, Grid, Typography } from '@mui/material'
import { ExerciseModel } from '../models/ExerciseModel'

function TemplateDetail() {
  const { name } = useParams()
  const personalTrainingStore = usePersonalTrainingStore()

  const currentTemplate = personalTrainingStore.templates.find(
    (t) => t.name === name,
  )

  const handleDelete = async (selectedExercise: ExerciseModel) => {
    currentTemplate.exercises = currentTemplate?.exercises.filter(
      (exercise) => selectedExercise.id !== exercise.id,
    )

    await personalTrainingStore.updateTemplate(currentTemplate)
    personalTrainingStore.updateTemplateLocally(currentTemplate)
  }

  return (
    <>
      <NavbarGuest />
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center"
      >
        Exercises in{' '}
        <span className="text-secondary">{currentTemplate?.name}</span> template
      </Typography>
      <Grid container>
        {currentTemplate?.exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ p: '12px' }}>
            <Button
              sx={{
                ml: '21px',
                color: '#fff',
                background: '#000000',
                fontSize: '14px',
                borderRadius: '20px',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
              onClick={() => handleDelete(exercise)}
            >
              <DeleteIcon />
              Delete
            </Button>
            <Typography
              fontWeight={700}
              sx={{ fontSize: { lg: '34px', xs: '24px' } }}
              mb="49px"
              textAlign="center"
            >
              {exercise.name}
            </Typography>
            <ExerciseCard exercise={exercise} isTemplateAvailable={false} />
          </Grid>
        ))}
      </Grid>
      {currentTemplate?.exercises.length === 0 && (
        <Box textAlign="center" mt="50px">
          <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: '34px', xs: '24px' } }}
          >
            No exercises available in this template
          </Typography>
        </Box>
      )}
    </>
  )
}

export default TemplateDetail
