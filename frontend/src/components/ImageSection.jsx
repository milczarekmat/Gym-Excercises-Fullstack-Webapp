import heroImg from '../assets/images/hero_img.jpg'
import Logo from './Logo'

function ImageSection() {
  return (
    <div className="relative flex justify-center">
      <img
        className="max-h-full max-w-full lg:rounded-br-3xl"
        src={heroImg}
        alt="Hero image"
      />
      <Logo className="hidden lg:block" />
    </div>
  )
}

export default ImageSection
