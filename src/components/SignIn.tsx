import { useState, FormEvent } from 'react';
import { 
  Box, 
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Check if user exists in localStorage from signup
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        u.username === formData.username && u.password === formData.password
      );

      if (user) {
        login();
        setAlert({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });
        navigate('/');
      } else {
        setError('Invalid username or password');
        setAlert({
          open: true,
          message: 'Invalid credentials',
          severity: 'error'
        });
      }
    } catch (err) {
      setError('Something went wrong');
      setAlert({
        open: true,
        message: 'Login failed',
        severity: 'error'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      position: 'relative',
      background: 'linear-gradient(135deg, #333333 50%, #ffffff 50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{
        bgcolor: 'white',
        borderRadius: '8px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Username
          </Typography>
          <TextField
            fullWidth
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!error}
            placeholder="john doe"
            variant="outlined"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#6C63FF',
                },
              },
            }}
          />

          <Typography variant="body2" sx={{ mb: 1 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            placeholder="Enter your password"
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: error ? '#f44336' : '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#6C63FF',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 3,
              bgcolor: '#6C63FF',
              '&:hover': {
                bgcolor: '#5A52D9',
              },
              textTransform: 'none',
              py: 1.5,
              borderRadius: '4px',
            }}
          >
            Sign in
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don't have an account?{' '}
              <Link 
                onClick={() => navigate('/signup')}
                sx={{ 
                  color: '#6C63FF',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar 
        open={alert.open} 
        autoHideDuration={3000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignIn;
