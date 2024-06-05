import expressApp from './expressApp'
import express from 'express'
import { databaseConnection } from './database'
import { PORT } from './config'

const StartServer = async () => {
  const app = express()

  await databaseConnection()

  await expressApp(app)

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`)
    })
    .on('error', (err) => {
      console.log(err)
      process.exit()
    })
}

StartServer()
