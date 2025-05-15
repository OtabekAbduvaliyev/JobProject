import { useState, useEffect } from 'react';
import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Menu,
  MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import type { Book } from '../types/book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookModal from './BookModal';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookCount, setBookCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
      setBookCount(JSON.parse(storedBooks).length);
    }
  }, []);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCreateBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString()
    };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setBookCount(updatedBooks.length);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setAlert({
      open: true,
      message: 'Book created successfully!',
      severity: 'success'
    });
  };

  const handleEditBook = (bookData: Omit<Book, 'id'>) => {
    if (!editingBook) return;
    const updatedBooks = books.map(book => 
      book.id === editingBook.id ? { ...bookData, id: book.id } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setEditingBook(null);
    setAlert({
      open: true,
      message: 'Book updated successfully!',
      severity: 'success'
    });
  };

  const handleDeleteBook = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setBookCount(updatedBooks.length);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setAlert({
      open: true,
      message: 'Book deleted successfully!',
      severity: 'success'
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #333333 50%, #ffffff 50%)',
    }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          backgroundColor: '#2C2C2C',
          borderRadius: '12px',
          p: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <AccountCircleIcon sx={{ fontSize: 35, color: '#6C63FF' }} />
              <Typography variant="h6" sx={{ ml: 1, color: '#6C63FF', fontWeight: 600 }}>
                Books List
              </Typography>
            </Box>
            <TextField
              placeholder="Search for any training you want..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '350px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#3C3C3C',
                  borderRadius: '8px',
                  color: 'white',
                  '& fieldset': {
                    border: 'none'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#888',
                  opacity: 1
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#888' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: '#888' }}>
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ color: '#888', p: 0 }}
            >
              <AccountCircleIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  bgcolor: '#2C2C2C',
                  color: 'white',
                  '& .MuiMenuItem-root:hover': {
                    bgcolor: 'rgba(108, 99, 255, 0.1)'
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleLogout} sx={{ color: '#ff4444' }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            You've got <span style={{ color: '#6C63FF' }}>{bookCount} book{bookCount !== 1 ? 's' : ''}</span>
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setIsModalOpen(true)}
            sx={{ 
              bgcolor: '#6C63FF',
              '&:hover': { bgcolor: '#5A52D9' },
              textTransform: 'none'
            }}
          >
            + Create a book
          </Button>
        </Box>
        <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
          Your books today
        </Typography>
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ 
                bgcolor: 'white',
                borderRadius: 2,
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                height: '100%',
                overflow: 'hidden',
                '&:hover .hover-actions': {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {book.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      ISBN: <span style={{ color: '#000' }}>{book.isbn}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pages: <span style={{ color: '#000' }}>{book.pages}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Published: <span style={{ color: '#000' }}>{book.published}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cover: <span style={{ color: '#000' }}>{book.cover.length > 30 ? `${book.cover.substring(0, 30)}...` : book.cover}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: <span style={{ color: '#000' }}>{book.author}</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: book.status === 'new' ? '#ff4444' : 
                               book.status === 'reading' ? '#ffbb33' : '#00C851',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {book.status}
                  </Box>
                </CardContent>
                <Box
                  className="hover-actions"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '60px',
                    display: 'flex',
                    alignItems: 'stretch',
                    opacity: 0,
                    transform: 'translateY(100%)',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <Button
                    onClick={() => handleDeleteBook(book.id)}
                    sx={{
                      flex: 1,
                      m: 0,
                      bgcolor: '#FF4444',
                      color: 'white',
                      borderRadius: 0,
                      '&:hover': { bgcolor: '#FF0000' },
                    }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingBook(book);
                      setIsModalOpen(true);
                    }}
                    sx={{
                      flex: 1,
                      m: 0,
                      bgcolor: '#6C63FF',
                      color: 'white',
                      borderRadius: 0,
                      '&:hover': { bgcolor: '#5A52D9' },
                    }}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
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
      <BookModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingBook ? handleEditBook : handleCreateBook}
        initialData={editingBook}
      />
    </Box>
  );
};
export default Home;