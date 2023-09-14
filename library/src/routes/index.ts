const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req, res):void => {
  res.render('index', {title: 'Main page'})
})

module.exports = userRouter
