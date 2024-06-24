import { useEffect } from 'react'
import NavbarGuest from '../components/NavbarGuest'
import { usePersonalTrainingStore } from '../stores/personalTrainingStore'

function TrainingTemplates() {
  const personalTrainingStore = usePersonalTrainingStore()

  useEffect(() => {
    personalTrainingStore.fetchTemplates()
  }, [])

  return (
    <>
      <NavbarGuest />
      {personalTrainingStore.templates.length > 0 ? (
        <h1>Training Templates</h1>
      ) : (
        <h1>No training templates yet</h1>
      )}
      {personalTrainingStore.templates.map((template) => (
        <div key={template.id}>
          <h2>{template.name}</h2>
          <p>{template.description}</p>
        </div>
      ))}
    </>
  )
}

export default TrainingTemplates
