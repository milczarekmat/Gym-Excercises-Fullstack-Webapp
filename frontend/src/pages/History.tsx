import { useEffect } from 'react'
import NavbarGuest from '../components/NavbarGuest'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'
import { Divider, Grid, Stack, Typography } from '@mui/material'

function History() {
  const personalTrainingStore = usePersonalTrainingStore()
  useEffect(() => {
    const fetchHistory = async () => {
      await personalTrainingStore.fetchTrainingHistory()
    }
    fetchHistory()
  }, [])

  useEffect(() => {
    console.log(personalTrainingStore.trainingHistory)
  }, [personalTrainingStore.trainingHistory])
  return (
    <>
      <NavbarGuest />
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '34px', xs: '24px' } }}
        mb="49px"
        textAlign="center"
      >
        Your training history
      </Typography>
      <Divider />
      <Grid container>
        {personalTrainingStore.trainingHistory.map((item) => (
          <Grid item xs={12} sx={{ paddingTop: '15px' }}>
            <Stack direction="row" justifyContent="center">
              <Typography
                sx={{
                  fontSize: { lg: '28px', xs: '22px' },
                  paddingBottom: { xs: '10px' },
                }}
                fontWeight={700}
                className="pr-8 text-secondary"
              >
                {item.templateId.name}
              </Typography>
              <Typography>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Stack>

            {item.details.map((detail) => (
              <>
                <Typography fontWeight={600} className="pl-4 text-secondary">
                  {detail.exercise.name}
                </Typography>
                {detail.sets.map((set, index) => (
                  <>
                    <Stack direction="row" spacing={2}>
                      <Typography className="pl-8">Set {index + 1}</Typography>
                      <Typography>{set.reps} reps</Typography>
                      <Typography>{set.weight} kg</Typography>
                    </Stack>
                  </>
                ))}
              </>
            ))}

            <Divider />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default History
