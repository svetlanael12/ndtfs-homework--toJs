import { IPort } from '../types'
const dotenv = require('dotenv')
dotenv.config()

const configEnv: IPort = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DBNAME: process.env.DB_NAME
}

module.exports = configEnv
