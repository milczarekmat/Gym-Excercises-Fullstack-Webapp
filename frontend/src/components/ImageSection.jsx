import heroImg from '../assets/hero_img.jpg'

function ImageSection() {
  return (
    <div className="flex justify-center relative">
      <img className="max-w-full max-h-full lg:rounded-br-3xl" src={heroImg} alt="Hero image" />
      <div className="text-white absolute left-10 top-10 text-4xl font-bold">LOGO</div>
    </div>
  )
}

export default ImageSection
