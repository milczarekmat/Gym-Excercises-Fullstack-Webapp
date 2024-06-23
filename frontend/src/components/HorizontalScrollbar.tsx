import { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Box, Typography } from '@mui/material'
import ExerciseCard from './ExerciseCard'
import BodyPart from './BodyPart'
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'

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

function HorizontalScrollbar({ data, bodyParts, setBodyPart, bodyPart }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          //   itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          <BodyPart item={item} />
          {/* {bodyParts ? (
            <BodyPart
              item={item}
              setBodyPart={setBodyPart}
              bodyPart={bodyPart}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )} */}
        </Box>
      ))}
    </ScrollMenu>
  )
}

export default HorizontalScrollbar
