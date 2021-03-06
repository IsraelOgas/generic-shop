import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '../../context'
import { useRouter } from 'next/router'

type FormData = {
  email: string,
  password: string,
};


const LoginPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showError, setShowError] = useState(false)

  const { loginUser } = useContext(AuthContext)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    const isValidLogin = await loginUser(email, password)
    if(!isValidLogin) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      return
    }

    const dest = router.query.p?.toString() || '/'
    router.replace(dest)
  }

  return (
    <AuthLayout title={ 'Ingresar' }>
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box sx={ { width: 350, padding: '10px 20px' } }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
            </Grid>

            <Grid item xs={ 12 }>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {
                ...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {
                ...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener mínimo 6 caracteres'
                  }
                })
                }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            {
              showError && (
                <Box sx={{ marginTop: 2, marginLeft: '-40px' }}>
                  <Chip
                    label="No se encuentra este usuario/contraseña en nuestros registros"
                    color='error'
                    icon={ <ErrorOutline /> }
                  />
                </Box>
              )
            }

            <Grid item xs={ 12 }>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >Ingresar</Button>
            </Grid>

            <Grid item xs={ 12 } display='flex' justifyContent='end'>
              <NextLink
                href={ router.query.p ? `/auth/register?=${ router.query.p }` : '/auth/register'}
                passHref
              >
                <Link>¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage