import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../assets/404.png';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3
    }}>
      <img 
        src={notFoundImage} 
        alt="404 Not Found" 
        style={{ 
          maxWidth: '80%',
          width: '500px'
        }} 
      />
      <Box sx={{
        display: 'flex',
        gap: 2,
        width: '500px',
        maxWidth: '80%'
      }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            bgcolor: '#6C63FF',
            color: 'white',
            '&:hover': { bgcolor: '#5A52D9' }
          }}
        >
          Go Home Page
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{
            borderColor: '#6C63FF',
            color: '#6C63FF',
            '&:hover': {
              borderColor: '#5A52D9',
              bgcolor: 'rgba(108, 99, 255, 0.1)'
            }
          }}
        >
          Reload Page
        </Button>
      </Box>
    </Box>
  );
};
export default NotFound;