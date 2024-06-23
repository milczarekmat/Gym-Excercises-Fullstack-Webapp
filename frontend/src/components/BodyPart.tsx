import { Stack, Typography } from '@mui/material'
import { useExerciseStore } from '../stores/exerciseStore'
import { imagesMap } from '../utils/bodyPartImageMap'

function BodyPart({ item }) {
  const exerciseStore = useExerciseStore()

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="scale-100 hover:scale-110"
      sx={
        exerciseStore.bodyPart === item
          ? {
              borderTop: '4px solid #FF2625',
              background: '#fff',
              borderBottomLeftRadius: '20px',
              width: '270px',
              height: '282px',
              cursor: 'pointer',
              gap: '47px',
            }
          : {
              background: '#fff',
              borderBottomLeftRadius: '20px',
              width: '270px',
              height: '282px',
              cursor: 'pointer',
              gap: '47px',
            }
      }
      onClick={() => {
        exerciseStore.setBodyPart(item)
        window.scrollTo({ top: 800, left: 100, behavior: 'smooth' })
      }}
    >
      <img
        src={imagesMap[item]}
        alt="dumbbell"
        style={{ width: '80px', height: '80px' }}
      />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {' '}
        {item}
      </Typography>
    </Stack>
  )
}

export default BodyPart
