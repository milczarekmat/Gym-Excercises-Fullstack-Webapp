import { Typography, Stack, Button } from '@mui/material'

// import BodyPartImage from '../assets/icons/body-part.png'
// import TargetImage from '../assets/icons/target.png'
// import EquipmentImage from '../assets/icons/equipment.png'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import { IoBodyOutline } from 'react-icons/io5'
import type { ExerciseModel } from '../models/ExerciseModel'

function Detail({ exerciseDetail }: { exerciseDetail: ExerciseModel }) {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail

  const extraDetail = [
    {
      icon: <IoBodyOutline size="50" />,
      name: bodyPart,
    },
    {
      icon: <AdsClickIcon style={{ fontSize: '50px' }} />,
      name: target,
    },
    {
      icon: <FitnessCenterIcon style={{ fontSize: '50px' }} />,
      name: equipment,
    },
  ]

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography
          sx={{ fontSize: { lg: '64px', xs: '30px' } }}
          fontWeight={700}
          textTransform="capitalize"
        >
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: { lg: '24px', xs: '18px' } }}
          color="#4F4C4C"
        >
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> is one of
          the best <br /> exercises to target your {target}. It will help you
          improve your <br /> mood and gain energy.
        </Typography>
        {extraDetail?.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: '#FFF2DB',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
              }}
            >
              {item.icon}
            </Button>
            <Typography
              textTransform="capitalize"
              sx={{ fontSize: { lg: '30px', xs: '20px' } }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Detail
