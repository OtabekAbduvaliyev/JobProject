import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { Book } from '../types/book';
interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  initialData?: Book | null;
}
const BookModal = ({ open, onClose, onSubmit, initialData }: BookModalProps) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    cover: '',
    pages: '',
    published: '',
    isbn: '',
    status: 'new'
  });
  useEffect(() => {
    if (initialData) {
      setBookData({
        title: initialData.title,
        author: initialData.author,
        cover: initialData.cover,
        pages: initialData.pages.toString(),
        published: initialData.published.toString(),
        isbn: initialData.isbn,
        status: initialData.status
      });
    } else {
      setBookData({
        title: '',
        author: '',
        cover: '',
        pages: '',
        published: '',
        isbn: '',
        status: 'new'
      });
    }
  }, [initialData, open]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...bookData,
      pages: parseInt(bookData.pages),
      published: parseInt(bookData.published)
    } as Omit<Book, 'id'>);
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
          xs: '90%',
          sm: '70%',
          md: '50%',
          lg: '40%',
          xl: '30%'
        },
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        bgcolor: 'white',
        borderRadius: 2,
        outline: 'none',
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #eee',
          p: 2
        }}>
          <Typography variant="h6" component="h2">
            {initialData ? 'Edit book' : 'Create a new book'}
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' }
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Author"
            margin="normal"
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Cover URL"
            margin="normal"
            value={bookData.cover}
            onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
          />
          <TextField
            fullWidth
            label="Pages"
            margin="normal"
            type="number"
            value={bookData.pages}
            onChange={(e) => setBookData({ ...bookData, pages: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Published Year"
            margin="normal"
            type="number"
            value={bookData.published}
            onChange={(e) => setBookData({ ...bookData, published: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="ISBN"
            margin="normal"
            value={bookData.isbn}
            onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={bookData.status}
              label="Status"
              onChange={(e) => setBookData({ ...bookData, status: e.target.value })}
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="finished">Finished</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              type="submit"
              sx={{ 
                flex: 1,
                bgcolor: '#6C63FF',
                '&:hover': { bgcolor: '#5A52D9' }
              }}
            >
              {initialData ? 'Save Changes' : 'Create'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{ 
                flex: 1,
                borderColor: '#6C63FF',
                color: '#6C63FF',
                '&:hover': { borderColor: '#5A52D9' }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default BookModal;
