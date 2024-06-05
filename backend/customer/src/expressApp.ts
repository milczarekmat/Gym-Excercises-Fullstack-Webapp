import express from 'express'
import cors from 'cors'
import { customer, appEvents } from './api'

export default async (app: express.Application) => {
  app.use(express.json())
  app.use(cors())
  app.use(express.static(__dirname + '/public'))

  //api
  appEvents(app)

  customer(app)
  // error handling
}
