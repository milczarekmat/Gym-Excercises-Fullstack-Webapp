import { Button } from '@mui/material'

function HeroContent() {
  return (
    <div className="text-shadow lg:text-shadow-none absolute z-50 ml-2 flex h-full flex-col justify-center px-10  pb-8 align-middle font-bold text-white mix-blend-plus-darker lg:text-black">
      <h1 className="text-4xl font-bold lg:text-6xl">
        Welcome to the best workout app
      </h1>
      <p className="mt-4 font-noto text-lg font-bold text-white lg:text-xl lg:font-normal lg:text-black">
        Get fit and healthy with our personalized workout plans
      </p>

      <div className="mb-4 mt-4">
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={() => {
            const aboutComponent = document.getElementById('about')
            aboutComponent &&
              aboutComponent.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
          }}
        >
          Get started
        </Button>
      </div>
    </div>
  )
}

export default HeroContent
