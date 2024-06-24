import TrainingTemplateModel from '../models/TrainingTemplate'
import TrainingModel from '../models/Training'
import { Exercise } from '../types/Exercise'
import { ObjectId } from 'mongodb'

interface ITemplate {
  name: string
  userId: string
  exercises: Exercise[]
}

class TrainingRepository {
  async CreateTrainingTemplate({ name, userId, exercises }: ITemplate) {
    const template = new TrainingTemplateModel({
      name,
      userId,
      exercises,
    })

    const templateResult = await template.save()
    return templateResult
  }

  async CreateTraining({
    template,
    userId,
    date,
    details,
  }: {
    template: ObjectId
    userId: string
    date: Date
    details: any
  }) {
    const training = new TrainingModel({
      template,
      userId,
      date,
      details,
    })

    const trainingResult = await training.save()
    return trainingResult
  }

  async FindUserTemplates({ userId }: { userId: string }) {
    const templates = await TrainingTemplateModel.find({ userId: userId })
    return templates
  }

  async FindTemplateById({ templateId }: { templateId: ObjectId }) {
    const template = await TrainingTemplateModel.findById(templateId)
    return template
  }

  async FindUserTrainingHistory({ userId }: { userId: string }) {
    const trainings = await TrainingModel.find({ userId: userId }).populate(
      'template'
    )

    return trainings
  }

  async FindUserTrainingsByTemplateId({
    userId,
    templateId,
  }: {
    userId: string
    templateId: string
  }) {
    const trainings = await TrainingModel.find({
      userId: userId,
      template: templateId,
    }).populate('template')

    return trainings
  }
}

export default TrainingRepository
