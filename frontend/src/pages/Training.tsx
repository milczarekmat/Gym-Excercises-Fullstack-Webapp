import {
  Grid,
  type SelectChangeEvent,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Divider,
  Stack,
  FormControl,
} from '@mui/material'
import { useState } from 'react'
import NavbarGuest from '../components/NavbarGuest'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'

function Training() {
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const personalTrainingStore = usePersonalTrainingStore()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTemplate(event.target.value as string)
  }

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
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            {' '}
            <Box sx={{ minWidth: 220 }}>
              <Select
                value={selectedTemplate}
                label="Template"
                onChange={handleChange}
                displayEmpty // This prop can help in ensuring a placeholder or the selected value is visible
                renderValue={(selected) => {
                  // This function can help in custom rendering the selected value
                  if (selected === '') {
                    return <em>Select a template</em> // Placeholder text when nothing is selected
                  }
                  return (
                    <em>
                      {personalTrainingStore.templates.find(
                        (template) => template.id === selected,
                      )?.name || 'Unknown'}
                    </em>
                  )
                }}
              >
                {personalTrainingStore.templates.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>Training</h1>
        </Grid>
      </Grid>

      <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {/* {.map} */}
        {/* <Typography>aaa</Typography> */}
      </Stack>
    </>
  )
}

export default Training
