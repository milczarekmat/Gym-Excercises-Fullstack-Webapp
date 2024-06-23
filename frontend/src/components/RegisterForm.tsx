import HowToRegIcon from '@mui/icons-material/HowToReg'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../stores/customerStore'
import { useNavigate } from 'react-router-dom'
import SuccessAlert from './SuccessAlert'
import { useEffect, useState } from 'react'

type FormValues = {
  email: string
  password: string
  terms: boolean
}

function RegisterForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      terms: false,
    },
  })
  const { register, handleSubmit, formState } = form

  const { errors } = formState

  const userStore = useUserStore()
  const navigate = useNavigate()

  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: FormValues) => {
    await userStore.signUp(data.email, data.password)
  }

  useEffect(() => {
    if (userStore.isLoggedIn) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        navigate('/')
      }, 1000)
    }
  }, [userStore.isLoggedIn])

  useEffect(() => {
    return () => {
      userStore.setErrorMessage(null)
    }
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            color="secondary"
            autoFocus
            {...register('email', {
              required: 'You must specify an email',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            color="secondary"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'You must specify a password',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat password"
            type="password"
            color="secondary"
            id="password1"
            autoComplete="current-password"
          /> */}

          <FormControl
            component="fieldset"
            variant="standard"
            error={!!errors.terms}
          >
            <FormControlLabel
              required
              control={<Checkbox color="secondary" />}
              label="I accept terms and conditions"
              {...register('terms', {
                required: 'You must accept the terms and conditions',
              })}
            />
            {errors.terms && (
              <FormHelperText>
                You must accept terms and conditions
              </FormHelperText>
            )}
          </FormControl>

          {userStore.errorMessage && (
            <Typography color="error">{userStore.errorMessage}</Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {success && <SuccessAlert message="You have successfully registered" />}
    </Container>
  )
}

export default RegisterForm
