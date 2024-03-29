import React, {useState, FormEvent} from 'react';
import { TextField, Link as MuiLink, Paper, Box, Grid, Typography, Dialog, 
  DialogActions, DialogContent, DialogTitle, DialogContentText} from '@mui/material';
import {Error} from '@mui/icons-material'
import {create} from './api-user'
import { Logo } from '../logo';
import { StyledButton } from '../styled-buttons'
import {Link} from 'react-router-dom'
import { scroller } from 'react-scroll'
import { useHistory, useLocation } from 'react-router-dom'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="#">
        Funda Gate
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface SignUpProps{
  name:String,
  password:String,
  email:String,
  open:boolean,
  error:String,
}

export default function SignUpSide() {
  const [values, setValues] = useState<SignUpProps>({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  })
  const handleChange = (name: string) => (event: FormEvent<HTMLFormElement>) => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleNonBackDropClose = (event: FormEvent<HTMLFormElement>, reason) => {
    setValues({ ...values, open: true})
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

  const path = useLocation().pathname
  const history = useHistory()
  const scrollToAnchor = (destination:string) => {
    scroller.scrollTo(destination, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -10
    })
  }
  const goToHomeAndScroll = async (destination:string) => {
    await history.push('/')
    await scrollToAnchor(destination)
  }

  return (<>
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?online-school-learning)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Logo onClick={()=>goToHomeAndScroll('hero')} />
            <Box sx={{ textAlign: 'center'}}>
              <Typography variant="h1" component="h2" sx={{ mb: 1, fontSize: { xs: '1rem', md: '2rem' } }}>
               Create your personal student or teacher account.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name} 
                onChange={handleChange('name')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email} 
                onChange={handleChange('email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password} 
                onChange={handleChange('password')}
              />
              <br/> 
              {
                values.error && (<Typography component="p" color="error">
                  <Error color="error" sx={{verticalAlign: 'middle'}}/>
                  Error: {values.error} Retry.</Typography>)
              }
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  my:2
                }}>
                <StyledButton type='submit' disableHoverEffect={false} variant="contained">
                  Sign Up
                </StyledButton>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={values.open}  onClose={(event, reason) => {if(reason === 'backdropClick'){handleNonBackDropClose(event, reason);}}}>
        <DialogTitle sx={{ textAlign: 'center', borderRadius:1, borderColor:'primary.main'}}>
          <Logo />
          <Typography variant="h1" component="h2" sx={{ mb: 1, fontSize: { xs: 32, md: 42 } }}>
            New account created.
          </Typography>        
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center'}}>
          <DialogContentText variant="body1" component="p" sx={{ fontSize: { xs: 16, md: 21 } }}>
            Sign in to proceed to proceed to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my:2
        }}>
          <Link to="/signin">
            <StyledButton disableHoverEffect={false} variant="outlined">
              Sign in
            </StyledButton>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}