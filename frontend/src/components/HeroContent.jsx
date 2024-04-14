import { Button } from '@mui/material'

function HeroContent() {
  return (
    <div className="flex flex-col align-middle justify-center h-full px-10 ml-2 pb-8">
      <h1 className="text-5xl font-bold">Welcome to the best workout app</h1>
      <p className="text-xl mt-4">
        Get fit and healthy with our personalized workout plans
      </p>

      <div className="mt-4">
        <Button color="secondary" variant="contained">Get started</Button>
      </div>
    </div>
  )
}

export default HeroContent
