import { Request, Response, NextFunction, Application } from 'express'
import TrainingService from '../services/trainingService'
import UserAuth from './middlewares/auth'
import { asyncWrapper } from '../utils/asyncWrapper'

export default (app: Application): void => {
  const service = new TrainingService()

  app.post(
    '/training-template',
    UserAuth,
    async (req: any, res: Response, next: NextFunction) => {
      const { name, exercises } = req.body
      const { _id } = req.user as { _id: string }
      const { data } = await service.createTrainingTemplate({
        name,
        userId: _id,
        exercises,
      })
      res.json(data)
    }
  )

  app.post(
    '/training',
    UserAuth,
    asyncWrapper(async (req: any, res: Response, next: NextFunction) => {
      const { template: templateId, date, details } = req.body
      const { _id } = req.user as { _id: string }

      const { data } = await service.createTraining({
        templateId,
        userId: _id,
        date,
        details,
      })

      res.json(data)
    })
  )

  app.get(
    '/training',
    UserAuth,
    async (req: any, res: Response, next: NextFunction) => {
      const { _id } = req.user as { _id: string }
      const { data } = await service.getUserTrainingHistory(_id)
      res.json(data)
    }
  )

  app.get(
    '/training-template',
    UserAuth,
    async (req: any, res: Response, next: NextFunction) => {
      const { _id } = req.user as { _id: string }
      const { data } = await service.getUserTemplates(_id)
      res.json(data)
    }
  )

  app.get('/whoami', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ msg: '/customer : I am Training Service' })
  })
}
