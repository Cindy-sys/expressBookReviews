const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 10: Get all books using Async/Await
public_users.get('/', async (req, res) => {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject({message: "Book not found"});
  })
  .then(book => res.status(200).send(book))
  .catch(err => res.status(404).send(err));
});

// Task 12: Get book details based on author using Async/Await
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  const filteredBooks = Object.values(books).filter(b => b.author === author);
  res.status(200).send(filteredBooks);
});

// Task 13: Get book details based on title using Async/Await
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  const filteredBooks = Object.values(books).filter(b => b.title === title);
  res.status(200).send(filteredBooks);
});

module.exports.general = public_users;
