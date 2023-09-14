const express = require('express')
const booksApiRouter = express.Router()
const fileUpload = require('../middleware/file')
const Book = require('../models/Book')
const path = require("path")
const container = require('../../container')
const BooksRepository = require('../../BooksRepository')
const fileMiddleware = require('../../middleware/file')


booksApiRouter.get("/", async (_req, res): Promise<void> => {
  const repo = container.get(BooksRepository)
  const books = await repo.getBooks()

  res.status(200).json(books)
});

booksApiRouter.get('/:id', async(req, res): Promise<void> => {
  const { id } = req.params
  const repo = container.get(BooksRepository)
  const book = await repo.getBook(id)

  if (book) {
    res.status(200).json(book)
  } else {
    res.status(404).send('not found')
  }
})

booksApiRouter.get('/:id/download', async(req, res): Promise<void> => {
  const { id } = req.params
  const repo = container.get(BooksRepository)
  const book = await repo.getBook(id)

  if (book) {
    res.download(path.join(__dirname, '../..', book.fileBook), (err) => {
      if (err) {
        res.status(404).send('not found')
      }
    })
  } else {
    res.status(404).send('not found')
  }
})

booksApiRouter.post('/:id/upload', fileUpload.single('file'), async(req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const repo = container.get(BooksRepository)
    let book = await repo.getBook(id)
    if (!req.file) {
      res.json(null);
      return;
    }
    const {path} = req.file;
    book = {
      ...book,
      fileBook: path
    }
    await book.save()
  } catch (e) {
    res.status(404);
    res.json({code: 404, message: '404 | page not found'})
  }
});

booksApiRouter.post('/', fileMiddleware.single('fileBook'), async(req, res): Promise<void> => {
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const newBook = new Book({ title, description, authors, favorite, fileCover, fileName, fileBook })
  try {
    const repo = container.get(BooksRepository)
    const book = await repo.createBook(newBook)
    await book.save()
    res.status(201).json(book)
  } catch (e) {
    console.error(e)
  }
})

booksApiRouter.put('/:id', async(req, res): Promise<void> => {
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const { id } = req.params
  try {
    const repo = container.get(BooksRepository)
    const book = await repo.getBook(id)
    await book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook })
    res.redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksApiRouter.delete('/:id', async(req, res): Promise<void> => {
  const { id } = req.params
  try {
    const repo = container.get(BooksRepository)
    await repo.deleteBook(id)
    res.status(200).send("ok")
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksApiRouter
