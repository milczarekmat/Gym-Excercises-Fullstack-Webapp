import React, { useCallback, useContext, useEffect, useState } from 'react'
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
    <ScrollMenu
      RightArrow={RightArrow}
      LeftArrow={LeftArrow}
      onWheel={onWheel}
    >
      {items.map(({ id, image, title }) => (
        <Box
          key={id}
          className="rounded-xl bg-primary mx-6 w-[200px] lg:w-[450px] h-[250px] cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out *:hover:scale-110 hover:after:*:w-full flex flex-col justify-center items-center"
        >
          <img className="rounded-xl w-[60%] lg:w-[40%] justify-center" src={image} alt={id} />
          <h1 className="mt-2 text-xl font-bold">{title}</h1>
        </Box>
      ))}
    </ScrollMenu>
  )
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0)
    apiObj.scrollNext()
  else if (ev.deltaY > 0)
    apiObj.scrollPrev()
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
    <img className="border-2 rounded-3xl p-2 border-secondary cursor-pointer mx-4" src={img} />
  )
}

export default PopularExercises
