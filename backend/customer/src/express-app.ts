import express from 'express'
import cors from 'cors'
// const { customer, appEvents } = require('./api')
// const { CreateChannel, SubscribeMessage } = require('./utils')

module.exports = async (app: express.Application) => {
  app.use(express.json())
  app.use(cors())
  app.use(express.static(__dirname + '/public'))

  //api
  // appEvents(app);

  //   const channel = await CreateChannel()

  //   customer(app, channel)
  // error handling
}
