import { Link } from 'react-router-dom'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { TrainingTemplateModel } from '../models/TrainingTemplateModel'
import { DeleteData } from '../utils/apiCalls'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'

function TemplateCard({ template }: { template: TrainingTemplateModel }) {
  const personalTrainingStore = usePersonalTrainingStore()

  const handleTemplateRemoving = async () => {
    const respone = await DeleteData(`/training-template/${template._id}`)

    if (respone.status === 200) {
      personalTrainingStore.setTemplates(
        personalTrainingStore.templates.filter((t) => t._id !== template._id),
      )
    }
  }

  return (
    <Box
      sx={{
        p: '12px',
        border: '1px solid #000',
        display: 'inline-block',
        borderRadius: '12px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Link
        className="exercise-card"
        to={`/template/${template.name}`}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <Stack direction="column">
          <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: '30px', xs: '20px' } }}
            mb="49px"
            textAlign="center"
          >
            {template.name}
          </Typography>
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
              Number of exercises {template.exercises.length}
            </Button>
          </Stack>
        </Stack>
      </Link>
      <IconButton aria-label="delete" onClick={handleTemplateRemoving}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default TemplateCard
