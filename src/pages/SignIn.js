import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import { Copyright } from './Register';
import { useFirebase } from '../context/Firebase';
import { ToastContainer } from 'react-toastify';


const defaultTheme = createTheme();


export default function SignIn() {

    const [loginUser,setLoginUser] = React.useState({email:'',password:''});
    const firebase = useFirebase();
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        const {value ,name } = e.target;
        setLoginUser(prev=>({...prev,[name]:value}));
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase.signInWithEmail(loginUser.email,loginUser.password);
    // signInWithEmailAndPassword(auth,loginUser.email,loginUser.password).then((data)=>console.log('SignIn Successful..')).catch((err)=>console.log(err));
    console.log(loginUser.email,loginUser.password);
  };

  const handleGoogle =()=>firebase.signInWithGoogle();

  console.log(firebase)
  React.useEffect(()=>{
    if(firebase.isLoggedIn){
        navigate('/');
    }
  },[firebase,navigate]);

  return (
    <>
    <ToastContainer/>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleLogin}
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
                onChange={handleLogin}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <Grid container>
                <Grid item>
                  <Link to={'/signup'} >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            
          </Box>
              <Box textAlign={'center'} marginTop={2} >
                
                <Typography>
                    <Button onClick={handleGoogle} variant="contained">G+</Button>
                </Typography>
                <Typography> 
                    Login with Google
                </Typography>
              </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}