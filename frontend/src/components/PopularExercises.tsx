import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import exercise from '../assets/images/exercise.jpg'
import exercise1 from '../assets/images/exercise1.jpg'
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'
import 'react-horizontal-scrolling-menu/dist/styles.css'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

const items = [
  { id: 'exercise', image: exercise, title: 'title' },
  { id: 'exercise1', image: exercise1, title: 'title' },
  { id: 'exercise2', image: exercise, title: 'title' },
  { id: 'exercise3', image: exercise1, title: 'title' },
  { id: 'exercise4', image: exercise, title: 'title' },
  { id: 'exercise5', image: exercise1, title: 'title' },
  { id: 'exercise6', image: exercise1, title: 'title' },
  { id: 'exercise7', image: exercise, title: 'title' },
  { id: 'exercise8', image: exercise1, title: 'title' },
]

function PopularExercises() {
  return (
    <div className="mb-36 mt-20">
      <ScrollMenu
        RightArrow={RightArrow}
        LeftArrow={LeftArrow}
        onWheel={onWheel}
      >
        {items.map(({ id, image, title }) => (
          <Box
            key={id}
            className="mx-6 flex h-[250px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-xl bg-secondary transition duration-300 ease-in-out hover:shadow-2xl *:hover:scale-110 hover:after:*:w-full lg:w-[450px]"
          >
            <img
              className="w-[60%] justify-center rounded-xl lg:w-[40%]"
              src={image}
              alt={id}
            />
            <h1 className="mt-2 text-xl font-bold text-white">{title}</h1>
          </Box>
        ))}
      </ScrollMenu>
    </div>
  )
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) apiObj.scrollNext()
  else if (ev.deltaY > 0) apiObj.scrollPrev()
}

function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext)

  return (
    <div className="flex items-center" onClick={() => scrollPrev()}>
      <Arrow img={leftArrow} />
    </div>
  )
}

function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext)

  return (
    <div className="flex items-center" onClick={() => scrollNext()}>
      <Arrow img={rightArrow} />
    </div>
  )
}

function Arrow({ img }: { img: string }) {
  return (
    <img
      className="mx-4 cursor-pointer rounded-3xl border-2 border-secondary p-2"
      src={img}
    />
  )
}

export default PopularExercises
