import express from 'express'
import { PORT } from './config'

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
  return res.status(200).json({ message: 'Hello from customer' })
})

app.listen(8001, () => {
  console.log('Customer service is running on port 8001')
  console.log(PORT)
})
