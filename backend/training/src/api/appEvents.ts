import TrainingService from '../services/trainingService'
import { Request, Response, NextFunction, Application } from 'express'

export interface AppEventPayload {
  event: string
  data: any
}

export default (app: Application) => {
  const service = new TrainingService()
  app.use(
    '/app-events',
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload }: { payload: AppEventPayload } = req.body

      //handle subscribe events
      service.SubscribeEvents(payload)

      console.log('============= Gym app ================')
      console.log(payload)
      res.json(payload)
    }
  )
}
