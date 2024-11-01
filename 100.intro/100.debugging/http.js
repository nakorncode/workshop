const http = require('http');

const Book = require('./book');

const books = [
  new Book('To Kill a Mockingbird', 'Harper Lee', 10),
  new Book('1984', 'George Orwell', 5)
];

const server = http.createServer((req, res) => {
  // Route: GET /books - Retrieves all books with availability
  if (req.url === '/books' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const booksWithAvailability = books.map(book => ({
      title: book.title,
      author: book.author,
      quantity: book.quantity,
      availability: book.getAvailability()
    }));
    res.end(JSON.stringify(booksWithAvailability));

  // Route: POST /books - Adds a new book
  // Request Body: { "title": "Book Title", "author": "Author Name", "quantity": Number }
  } else if (req.url === '/books' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { title, author, quantity } = JSON.parse(body);
      const newBook = new Book(title, author, quantity);
      books.push(newBook);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        title: newBook.title,
        author: newBook.author,
        quantity: newBook.quantity,
        availability: newBook.getAvailability()
      }));
    });

  // Route: POST /books/restock - Restocks a book
  // Request Body: { "title": "Book Title", "quantity": Number }
  } else if (req.url === '/books/restock' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { title, quantity } = JSON.parse(body);
      const book = books.find(book => book.title === title);
      if (book) {
        book.restock(quantity);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: book.title,
          author: book.author,
          quantity: book.quantity,
          availability: book.getAvailability()
        }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Book not found' }));
      }
    });

  // Route: POST /books/sell - Sells a book
  // Request Body: { "title": "Book Title", "quantity": Number }
  } else if (req.url === '/books/sell' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { title, quantity } = JSON.parse(body);
      const book = books.find(book => book.title === title);
      if (book) {
        book.sell(quantity);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: book.title,
          author: book.author,
          quantity: book.quantity,
          availability: book.getAvailability()
        }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Book not found' }));
      }
    });

  // Route: Unknown - 404 Not Found
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

