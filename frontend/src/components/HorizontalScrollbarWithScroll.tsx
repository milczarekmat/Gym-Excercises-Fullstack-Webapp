import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import type { ExerciseModel } from '../models/ExerciseModel'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

function HorizontalScrollbarWithScroll({ items }: { items: ExerciseModel[] }) {
  return (
    <div className="mb-36 mt-20">
      <ScrollMenu
        RightArrow={RightArrow}
        LeftArrow={LeftArrow}
        onWheel={onWheel}
      >
        {items.map(({ id, gifUrl, name }) => (
          <Box
            key={id}
            className="mx-6 flex h-[250px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-xl bg-secondary transition duration-300 ease-in-out hover:shadow-2xl *:hover:scale-110 hover:after:*:w-full lg:w-[450px]"
          >
            <img
              className="w-[60%] justify-center rounded-xl lg:w-[40%]"
              src={gifUrl}
              alt={id}
            />
            <h1 className="mt-2 text-xl font-bold text-white">{name}</h1>
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

export default HorizontalScrollbarWithScroll
