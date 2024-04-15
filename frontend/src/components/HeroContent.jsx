import { Button } from '@mui/material'

function HeroContent() {
  return (
    <div className="flex flex-col align-middle justify-center h-full px-10 ml-2 pb-8 absolute text-black font-bold mix-blend-plus-darker">
      <h1 className="lg:text-6xl text-4xl font-bold">Welcome to the best workout app</h1>
      <p className="lg:text-xl lg:font-normal text-lg font-bold mt-4 font-noto">
        Get fit and healthy with our personalized workout plans
      </p>

      <div className="mt-4 mb-4">
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={() => {
            const search = document.getElementById('search')
            search && search.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          Get started
        </Button>
      </div>
    </div>
  )
}

export default HeroContent
