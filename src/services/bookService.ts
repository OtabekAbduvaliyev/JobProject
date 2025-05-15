import type { Book } from '../types/book';

export const bookService = {
  // Barcha kitoblarni local storage dan olish
  getAll: (): Book[] => {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
  },

  // Yangi kitob qo'shish
  // book: Yangi qo'shiladigan kitob ma'lumotlari
  add: (book: Book): void => {
    const books = bookService.getAll();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  },

  // Mavjud kitobni yangilash
  // updatedBook: Yangilangan kitob ma'lumotlari
  update: (updatedBook: Book): void => {
    const books = bookService.getAll();
    const index = books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      books[index] = updatedBook;
      localStorage.setItem('books', JSON.stringify(books));
    }
  },

  // Kitobni o'chirish
  // id: O'chiriladigan kitobning identifikatori
  delete: (id: string): void => {
    const books = bookService.getAll();
    const filtered = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(filtered));
  }
};
