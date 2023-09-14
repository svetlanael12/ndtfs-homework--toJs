const express = require('express')
const configEnv = require('./src/config')
const indexRouter = require('./src/routes')
const userApiRouter = require('./src/routes/userApiRouter')
const booksRouter = require('./src/routes/booksRouter')
const booksApiRouter = require('./src/routes/booksApiRouter')
const errorMiddleware = require('./src/middleware/error')
const mongoose = require('mongoose');

const app = express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

async function start() {
  try {
    const UrlDb = `mongodb://mongo27017/${configEnv.DBNAME}`
    await mongoose.connect(UrlDb)
    app.listen(configEnv.PORT, () => {
      console.log(`App is started at ${configEnv.HOST}${configEnv.PORT}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
