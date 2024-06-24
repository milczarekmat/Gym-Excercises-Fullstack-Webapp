import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideo'
import {
  GetDataWithHeaders,
  exerciseOptions,
  youtubeOptions,
} from '../utils/apiCalls'
import SimilarExercises from '../components/SimilarExercises'
import type { ExerciseModel } from '../models/ExerciseModel'
import NavbarGuest from '../components/NavbarGuest'

function ExerciseDetail() {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState<
    ExerciseModel[]
  >([])
  const [equipmentExercises, setEquipmentExercises] = useState<ExerciseModel[]>(
    [],
  )
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl =
        'https://youtube-search-and-download.p.rapidapi.com'

      const exerciseDetailData = await GetDataWithHeaders(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions,
        false,
      )
      setExerciseDetail(exerciseDetailData)

      const exerciseVideosData = await GetDataWithHeaders(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions,
        false,
      )
      setExerciseVideos(exerciseVideosData.contents)

      const targetMuscleExercisesData = await GetDataWithHeaders(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}?limit=20`,
        exerciseOptions,
        false,
      )
      setTargetMuscleExercises(targetMuscleExercisesData)

      const equipmentExercisesData = await GetDataWithHeaders(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}?limit=20`,
        exerciseOptions,
        false,
      )
      setEquipmentExercises(equipmentExercisesData)
    }

    fetchExercisesData()
  }, [id])

  if (!exerciseDetail) return <div>No Data</div>

  return (
    <>
      <NavbarGuest />
      <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos
          exerciseVideos={exerciseVideos}
          name={exerciseDetail.name}
        />
        <SimilarExercises
          targetMuscleExercises={targetMuscleExercises}
          equipmentExercises={equipmentExercises}
        />
      </Box>
    </>
  )
}

export default ExerciseDetail
