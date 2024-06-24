import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { ExerciseModel } from '../models/ExerciseModel'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'
import { useUserStore } from '../stores/customerStore'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function ExerciseCard({
  exercise,
  isTemplateAvailable = true,
}: {
  exercise: ExerciseModel
  isTemplateAvailable?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const personalTrainingStore = usePersonalTrainingStore()
  const userStore = useUserStore()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setTemplateName('')
  }

  const handleTemplateAdd = async (index: number) => {
    const template = personalTrainingStore.templates[index]
    if (template.exercises.filter((ex) => ex.id === exercise.id).length > 0) {
      alert('Exercise already exists in this template')
      return
    }

    const newTemplate = {
      ...template,
      exercises: [...template.exercises, exercise],
    }

    await personalTrainingStore.updateTemplate(newTemplate)
    personalTrainingStore.updateTemplateLocally(newTemplate)
    handleClose()

    alert('Exercise added to template')
  }

  useEffect(() => {
    personalTrainingStore.fetchTemplates()
  }, [])

  return (
    <>
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

          {userStore.isLoggedIn && isTemplateAvailable && (
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
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleOpen()
              }}
            >
              <AddIcon />
              Add to your template
            </Button>
          )}
        </Stack>
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {personalTrainingStore.templates.length > 0 ? (
            <>
              <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: '24px', xs: '14px' } }}
                mb="49px"
                textAlign="center"
              >
                Your training templates
              </Typography>

              {personalTrainingStore.templates.map((template, index) => (
                <>
                  <Box className="flex justify-between align-middle">
                    <Box>{template.name}</Box>
                    <IconButton
                      color="secondary"
                      onClick={() => handleTemplateAdd(index)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Divider />
                </>
              ))}
            </>
          ) : (
            <>
              <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: '24px', xs: '14px' } }}
                mb="49px"
                textAlign="center"
              >
                No training templates
                <br />
                yet
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ExerciseCard
