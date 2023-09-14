import { IPort } from '../../library/src/types'
const dotenv = require('dotenv')
dotenv.config()

const configEnv: IPort = {
  PORT: process.env.PORT,
  HOST: process.env.HOST
}

module.exports = configEnv
