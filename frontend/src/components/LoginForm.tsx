import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/customerStore'
import { useEffect, useState } from 'react'
import SuccessAlert from './SuccessAlert'

type FormValues = {
  email: string
  password: string
}

function LoginForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const userStore = useUserStore()
  const navigate = useNavigate()

  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState } = form

  const { errors } = formState

  const onSubmit = async (data: FormValues) => {
    await userStore.signIn(data.email, data.password)
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
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

          {userStore.errorMessage && (
            <Typography color="error">{userStore.errorMessage}</Typography>
          )}

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link to={''}>Forgot password?</Link>
            </Grid> */}
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {success && <SuccessAlert message="You have successfully signed in" />}
    </Container>
  )
}

export default LoginForm
