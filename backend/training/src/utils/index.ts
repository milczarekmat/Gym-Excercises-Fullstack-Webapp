import jwt from 'jsonwebtoken'

const { APP_SECRET } = require('../config')
import { Request } from 'express'

export const GenerateSignature = async (payload: string | object | Buffer) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '30d' })
  } catch (error) {
    console.log(error)
    return error
  }
}

export const ValidateSignature = async (req: Request & { user?: any }) => {
  try {
    const signature = req.get('Authorization')
    console.log(signature)
    if (signature) {
      const payload = jwt.verify(signature.split(' ')[1], APP_SECRET)
      req.user = payload
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const FormateData = (data: unknown) => {
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}
