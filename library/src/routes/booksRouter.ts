const express = require('express')
const booksRouter = express.Router()
const fileMiddleware = require('../middleware/file')
const Book = require('../models/Book');
const { incCounter, getCounter } = require('../api/counter')
const container = require('../../container')
const BooksRepository = require('../../BooksRepository')


booksRouter.get('/view', async(_req, res): Promise<void> => {
  try {
    const repo = container.get(BooksRepository)
    const books = await repo.getBooks()
    res.render('books/index', {title: "Our books", books: books})
  } catch (e) {
    res.status(404).redirect('/404')
  }
})


booksRouter.get('/view/:id', async(req, res): Promise<void> => {
  const { id } = req.params
  try {
    const repo = container.get(BooksRepository)
    const book = await repo.getBooks(id)
    await incCounter(id);
    const counter = await getCounter(id);
    res.render('books/view', {title: 'Chosen books', book, counter})
  } catch (e) {
    res.status(404)
    res.redirect('/404')
  }
})

booksRouter.get('/create', (_req, res): void => {
  res.render('books/create', { title: 'Add books', book: {} })
})

booksRouter.post('/create', fileMiddleware.single('file'), async(req, res): Promise<void> => {
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null

  try {
    const repo = container.get(BooksRepository)
    const book = await repo.createBook({ title, authors, description, favorite, fileCover, fileName,fileBook })
    await book.save();
    res.redirect("/books/view")
  } catch (e) {
    res.status(404)
    res.redirect('/404')
  }
})

booksRouter.get('/update/:id', async(req, res): Promise<void> => {
  const { id } = req.params
  try {
    const repo = container.get(BooksRepository)
    let book = await repo.getBooks(id)
    res.render('books/update', {
      title: 'Edit books',
      book: book,
    })
  } catch {
    res.status(404).redirect('/404')
  }
})

booksRouter.post('/update/:id', fileMiddleware.single('file'), async(req, res): Promise<void> => {
  const { id } = req.params
  try {
    const { title, authors, description, favorite, fileCover, fileName } = req.body
    const repo = container.get(BooksRepository)
    const book = await repo.getBook(id)
    const fileBook = req.file ? req.file : null
    await book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook })
    res.status(200).redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(404).redirect("/404")
  }
})

booksRouter.post('/delete/:id', async(req, res): Promise<void> => {
  const { id } = req.params
  try {
    const repo = container.get(BooksRepository)
    await repo.deleteBook(id)
    res.status(200).redirect("/books/view");
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksRouter
