import { useState } from 'react';
import type { FormEvent } from 'react';
import { 
  Box, 
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords not matching");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // Check if username already exists
      if (users.some((u: any) => u.username === formData.username)) {
        setError('Username already exists');
        return;
      }

      // Store new user
      users.push({
        username: formData.username,
        password: formData.password
      });
      localStorage.setItem('users', JSON.stringify(users));
      
      login();
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        background: 'linear-gradient(135deg, #333333 50%, #ffffff 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '8px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Sign up
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
              mb: 2,
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
          <Typography variant="body2" sx={{ mb: 1 }}>
            Confirm password
          </Typography>
          <TextField
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!error}
            placeholder="Enter your confirm password"
            variant="outlined"
            sx={{
              mb: 3,
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
            Submit
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already signed up?{' '}
              <Link 
                onClick={() => navigate('/signin')}
                sx={{ 
                  cursor: 'pointer',
                  color: '#6C63FF',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Go to sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;
