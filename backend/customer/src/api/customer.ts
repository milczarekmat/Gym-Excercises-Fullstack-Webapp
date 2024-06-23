import { Request, Response, NextFunction, Application } from 'express'
import CustomerService from '../services/customerService'
import UserAuth from './middlewares/auth'
import { asyncWrapper } from '../utils/asyncWrapper'

export default (app: Application): void => {
  const service = new CustomerService()

  app.post(
    '/signup',
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body
      const { data } = await service.SignUp({ email, password })
      res.json(data)
    })
  )

  app.post(
    '/login',
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body

      const { data } = await service.SignIn({ email, password })

      res.json(data)
    })
  )

  app.get(
    '/profile',
    UserAuth,
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      const { _id } = req.user as { _id: string }
      const { data } = await service.GetProfile(_id)
      res.json(data)
    }
  )

  //   app.get('/wishlist', UserAuth, async (req: Request, res: Response, next: NextFunction) => {
  //     const { _id } = req.user
  //     const { data } = await service.GetWishList(_id)
  //     return res.status(200).json(data)
  //   })

  app.get('/whoami', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ msg: '/customer : I am Customer Service' })
  })
}
