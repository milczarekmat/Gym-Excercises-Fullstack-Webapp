/* eslint-disable style/multiline-ternary */
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  Typography,
  Modal,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import NavbarGuest from '../components/NavbarGuest'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'
import { useUserStore } from '../stores/customerStore'
import type { ExerciseModel } from '../models/ExerciseModel'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function Training() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedTemplateDetails, setSelectedTemplateDetails] = useState(null)
  const [isTrainingStarted, setIsTrainingStarted] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalExercise, setModalExercise] = useState(null)
  const [modalReps, setModalReps] = useState(null)
  const [modalWeight, setModalWeight] = useState(null)

  const handleModalOpen = (exercise: ExerciseModel) => {
    setModalExercise(exercise)
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setModalExercise(null)
    setModalReps(null)
    setModalWeight(null)
    setIsModalOpen(false)
  }

  const [trainingState, setTrainingState] = useState(null)

  const personalTrainingStore = usePersonalTrainingStore()
  const userStore = useUserStore()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTemplate(event.target.value as string)
  }

  const handleSaveTraining = async () => {
    const result = await personalTrainingStore.saveTraining(trainingState)

    if (result.status === 200) {
      setTrainingState(null)
      setIsTrainingStarted(false)
      alert('Training saved successfully')
    }
  }

  const startTraining = () => {
    const initialTrainingObj = {
      templateId: selectedTemplate,
      date: new Date(),
      userId: userStore.user?._id,
      details:
        selectedTemplateDetails?.exercises?.map((exercise) => ({
          exercise,
          sets: [],
        })) || [],
    }
    setTrainingState(initialTrainingObj)
  }

  const updateExerciseSet = (exerciseId, setIndex, newSetData) => {
    setTrainingState((prevState) => {
      const updatedDetails = prevState.details.map((detail) => {
        if (detail.exercise.id === exerciseId) {
          const updatedSets = [...detail.sets]
          updatedSets[setIndex] = { ...updatedSets[setIndex], ...newSetData }
          return { ...detail, sets: updatedSets }
        }
        return detail
      })
      return { ...prevState, details: updatedDetails }
    })
  }

  const removeExerciseSet = (exerciseId, setIndex) => {
    setTrainingState((prevState) => {
      const updatedDetails = prevState.details.map((detail) => {
        if (detail.exercise.id === exerciseId) {
          const updatedSets = [...detail.sets]
          updatedSets.splice(setIndex, 1) // Remove the set at the specified index
          return { ...detail, sets: updatedSets }
        }
        return detail
      })
      return { ...prevState, details: updatedDetails }
    })
  }

  const addExerciseSet = (exerciseId, newSetData) => {
    setTrainingState((prevState) => {
      const updatedDetails = prevState.details.map((detail) => {
        if (detail.exercise.id === exerciseId) {
          const updatedSets = [...detail.sets, newSetData]
          return { ...detail, sets: updatedSets }
        }
        return detail
      })
      return { ...prevState, details: updatedDetails }
    })
  }

  const handleTrainingStart = () => {
    startTraining()
    setIsTrainingStarted(true)
  }

  const handleTrainingCancel = () => {
    setTrainingState(null)
    setIsTrainingStarted(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!personalTrainingStore.templates.length)
        await personalTrainingStore.fetchTemplates()
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedTemplate) {
      setSelectedTemplateDetails(
        personalTrainingStore.templates.find(
          (template) => template._id === selectedTemplate,
        ),
      )
    }
  }, [selectedTemplate])

  return (
    <>
      <NavbarGuest />
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '34px', xs: '24px' } }}
        mb="49px"
        textAlign="center"
      >
        Start training based on your saved templates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Template</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTemplate}
                label="Template"
                onChange={handleChange}
                disabled={isTrainingStarted}
                color="secondary"
              >
                {personalTrainingStore.templates.map((template) => (
                  <MenuItem key={template.id} value={template._id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {isTrainingStarted ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleTrainingCancel()}
              >
                Cancel training
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveTraining}
              >
                Save training
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleTrainingStart()}
              disabled={
                !selectedTemplate || !selectedTemplateDetails?.exercises?.length
              }
            >
              Start training
            </Button>
          )}
        </Grid>
      </Grid>

      {selectedTemplateDetails?.exercises?.length !== 0 ? (
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{ marginTop: '40px', padding: '12px' }}
        >
          {selectedTemplateDetails?.exercises?.map((exercise) => (
            <>
              <Stack direction="row">
                <Typography sx={{ paddingTop: '7px' }}>
                  {exercise.name}
                </Typography>
                {isTrainingStarted && (
                  <IconButton
                    color="secondary"
                    onClick={() => handleModalOpen(exercise)}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Stack>
              {trainingState?.details.map((detail) => {
                if (detail.exercise.id === exercise.id) {
                  return detail.sets.map((set, setIndex) => (
                    <Stack direction="row" key={`${exercise._id}-${setIndex}`}>
                      <Typography
                        sx={{ paddingTop: '5px', paddingX: '5px' }}
                        className="text-secondary"
                      >
                        Set
                        {setIndex + 1}
                      </Typography>
                      <Typography sx={{ paddingTop: '5px', paddingX: '5px' }}>
                        Reps:
                        {set.reps}
                      </Typography>
                      <Typography sx={{ paddingTop: '5px', paddingX: '5px' }}>
                        Weight:
                        {set.weight}
                      </Typography>
                      <IconButton
                        color="secondary"
                        onClick={() => removeExerciseSet(exercise.id, setIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))
                }
                return null
              })}
            </>
          ))}
        </Stack>
      ) : (
        <Typography sx={{ margin: '12px' }}>No exercises found</Typography>
      )}

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add set
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Reps"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={{ min: 0 }}
            color="secondary"
            onChange={(e) => setModalReps(Number(e.target.value))}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Weight"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            variant="outlined"
            color="secondary"
            onChange={(e) => setModalWeight(Number(e.target.value))}
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: '10px' }}
            disabled={
              modalReps === null ||
              modalWeight === null ||
              modalReps < 0 ||
              modalWeight < 0
            }
            onClick={() => {
              addExerciseSet(modalExercise.id, {
                reps: modalReps,
                weight: modalWeight,
              })
              handleModalClose()
            }}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginTop: '10px', marginLeft: '20px' }}
            onClick={() => handleModalClose()}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Training
