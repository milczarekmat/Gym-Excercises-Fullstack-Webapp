import { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Box, Typography } from '@mui/material'
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'
import type { ExerciseModel } from '../models/ExerciseModel'
import BodyPart from './BodyPart'
import ExerciseCard from './ExerciseCard'

function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext)

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={leftArrow} alt="right-arrow" />
    </Typography>
  )
}

function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext)

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={rightArrow} alt="right-arrow" />
    </Typography>
  )
}

function HorizontalScrollbar({
  data,
  bodyParts,
}: {
  data: (ExerciseModel | string)[]
  bodyParts?: string[]
}) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflowX: 'auto', width: '100%', whiteSpace: 'nowrap' }}
    >
      {data.map((item) => (
        <Box
          key={item?.id || item}
          // itemID={item.id || item}
          title={item?.id || item}
          m="0 40px"
        >
          {bodyParts ? (
            <BodyPart item={item} />
          ) : (
            <ExerciseCard exercise={item as ExerciseModel} />
          )}
        </Box>
      ))}
    </ScrollMenu>
  )
}

export default HorizontalScrollbar
