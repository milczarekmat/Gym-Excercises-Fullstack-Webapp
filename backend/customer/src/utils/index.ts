import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { APP_SECRET } = require('../config')

//Utility functions
export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (
  password: string,
  salt: string | number
) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string | number
) => {
  return bcrypt.compare(enteredPassword, savedPassword)
}

export const GenerateSignature = async (payload: string | object | Buffer) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '30d' })
  } catch (error) {
    console.log(error)
    return error
  }
}

export const ValidateSignature = async (req) => {
  try {
    const signature = req.get('Authorization')
    console.log(signature)
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
    req.user = payload
    return true
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
