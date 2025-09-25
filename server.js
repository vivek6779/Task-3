const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());       // 🔹 CORS enabled
app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" }
];

app.get("/books", (req, res) => res.json(books));

app.post("/books", (req, res) => {
  const newBook = { id: books.length + 1, title: req.body.title, author: req.body.author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted" });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
