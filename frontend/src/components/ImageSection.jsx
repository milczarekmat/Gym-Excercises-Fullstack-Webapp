import heroImg from '../assets/hero_img.jpg'

function ImageSection() {
  return (
    <div className="p-3 flex justify-center">
      <img className="max-w-full max-h-full" src={heroImg} alt="Hero image" />
    </div>
  )
}

export default ImageSection
