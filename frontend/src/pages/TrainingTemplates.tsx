import { useEffect, useState } from 'react'
import NavbarGuest from '../components/NavbarGuest'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { useUserStore } from '../stores/customerStore'
import { useNavigate } from 'react-router-dom'
import TemplateCard from '../components/TemplateCard'

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

function TrainingTemplates() {
  const personalTrainingStore = usePersonalTrainingStore()
  const userStore = useUserStore()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setTemplateName('')
  }

  const handleCreation = async () => {
    if (
      personalTrainingStore.templates.filter(
        (template) => template.name === templateName,
      ).length > 0
    ) {
      alert('Template with this name already exists')
      return
    }

    const newTemplate = {
      name: templateName,
      userId: userStore?.user?._id,
      exercises: [],
    }
    await personalTrainingStore.addTemplate(newTemplate)

    personalTrainingStore.pushTemplate(newTemplate)
    handleClose()
  }

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      return
    }
    personalTrainingStore.fetchTemplates()
  }, [])

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      return
    }
    personalTrainingStore.fetchTemplates()
  }, [userStore.isLoggedIn])

  return (
    <>
      <NavbarGuest />

      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{ my: '20px', ml: '20px' }}
      >
        Create new template
      </Button>

      {personalTrainingStore.templates.length > 0 ? (
        <>
          <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: '44px', xs: '30px' } }}
            mb="49px"
            textAlign="center"
          >
            Your training templates
          </Typography>
        </>
      ) : (
        <>
          <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: '44px', xs: '30px' } }}
            mb="49px"
            textAlign="center"
          >
            No training templates
            <br />
            yet
          </Typography>
        </>
      )}

      <Grid container>
        {personalTrainingStore.templates.map((template, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px',
            }}
          >
            <TemplateCard template={template} key={index} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Type name for template
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreation}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default TrainingTemplates
