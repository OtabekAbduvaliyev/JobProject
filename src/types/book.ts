export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  pages: number;
  published: number;
  isbn: string;
  status: 'new' | 'reading' | 'finished';
}
