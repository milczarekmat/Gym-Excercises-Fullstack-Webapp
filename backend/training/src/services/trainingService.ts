import { AppEventPayload } from '../api/appEvents'
import { TrainingRepository } from '../database'
import { ObjectId } from 'mongodb'

import { FormateData, GenerateSignature } from '../utils'
import { AppError, BadRequestError, CredentialsError } from '../utils/appErrors'
import { Exercise } from '../database/types/Exercise'

class TrainingService {
  repository: TrainingRepository

  constructor() {
    this.repository = new TrainingRepository()
  }

  async getUserTemplates(userId: string) {
    const templates = await this.repository.FindUserTemplates({ userId })
    return FormateData(templates)
  }

  async updateTemplate({
    userId,
    name,
    exercises,
  }: {
    userId: string
    name: string
    exercises: Exercise[]
  }) {
    const template = await this.repository.FindTemplateByUserIdAndName({
      userId,
      name,
    })

    if (!template) {
      throw new BadRequestError('Template not found!', '')
    }
    const updatedTemplate = await this.repository.UpdateTemplate({
      userId,
      name,
      exercises,
    })
    return FormateData(updatedTemplate)
  }

  async deleteTemplate({ templateId }: { templateId: string }) {
    // const templateObjId = new ObjectId(templateId)

    const template = await this.repository.FindTemplateById({
      templateId,
    })

    if (!template) {
      throw new BadRequestError('Template not found!', '')
    }

    const result = await this.repository.DeleteTemplateById({
      templateObjId: templateId,
    })
    console.log(result, 'result')
    return FormateData({ message: 'Template deleted successfully!' })
  }

  async getUserTrainingHistory(userId: string) {
    const trainings = await this.repository.FindUserTrainingHistory({ userId })
    return FormateData(trainings)
  }

  async getUserTrainingsByTemplateId(userId: string, templateId: string) {
    const trainings = await this.repository.FindUserTrainingsByTemplateId({
      userId,
      templateId,
    })
    return FormateData(trainings)
  }

  async createTrainingTemplate({ name, userId, exercises }) {
    const template = await this.repository.CreateTrainingTemplate({
      name,
      userId,
      exercises,
    })
    return FormateData(template)
  }

  async createTraining({
    templateId,
    userId,
    date,
    details,
  }: {
    templateId: string
    userId: string
    date: Date
    details: any
  }) {
    const templateObjectId = new ObjectId(templateId)
    const template = await this.repository.FindTemplateById({
      templateId,
    })

    if (!template) {
      throw new BadRequestError('Template not found!', '')
    }

    const training = await this.repository.CreateTraining({
      template: templateObjectId,
      userId,
      date,
      details,
    })
    return FormateData(training)
  }

  async SubscribeEvents(payload: AppEventPayload) {
    console.log('Triggering.... Customer Events')

    // const payloadObj = JSON.parse(payload) as { event: string; data: any }

    const { event, data } = payload

    const { userId, product, order, qty } = data

    switch (event) {
      //   case 'ADD_TO_WISHLIST':
      //   case 'REMOVE_FROM_WISHLIST':
      //     this.AddToWishlist(userId, product)
      //     break
      //   case 'ADD_TO_CART':
      //     this.ManageCart(userId, product, qty, false)
      //     break
      //   case 'REMOVE_FROM_CART':
      //     this.ManageCart(userId, product, qty, true)
      //     break
      //   case 'CREATE_ORDER':
      //     this.ManageOrder(userId, order)
      //     break
      default:
        break
    }
  }
}

export default TrainingService
