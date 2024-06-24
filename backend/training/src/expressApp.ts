import express from 'express'
import cors from 'cors'
import { training, appEvents } from './api'
import { ErrorHandler } from './utils/errorHandler'

export default async (app: express.Application) => {
  app.use(express.json())
  app.use(cors())
  app.use(express.static(__dirname + '/public'))

  //api
  appEvents(app)

  training(app)
  // error handling
  app.use(ErrorHandler)
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1) // exit application
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1) // exit application
})
