import { IconContext } from 'react-icons'
import { CgGym } from 'react-icons/cg'
import { GiGymBag } from 'react-icons/gi'
import { MdOutlineSportsGymnastics } from 'react-icons/md'

function AboutSection() {
  return (
    <section
      id="about"
      className="grid space-y-10 p-12 text-justify font-noto lg:grid-cols-3 lg:space-x-8 lg:space-y-0"
    >
      <div>
        <div className="flex justify-center align-middle">
          <IconContext.Provider value={{ color: '#4c0000', size: '50px' }}>
            <CgGym size={35} />
          </IconContext.Provider>
          <h1 className="header pl-2">What we do</h1>
        </div>
        <p className="px-6 lg:px-12">
          Our app is designed to help you get fit and healthy with our
          personalized workout plans. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Quidem quas qui quod, deleniti praesentium adipisci
          iusto placeat. Cupiditate suscipit quis dignissimos voluptas dicta
          illo alias sapiente ad labore blanditiis? Officia?
        </p>
      </div>
      <div>
        <div className="flex justify-center align-middle">
          <IconContext.Provider value={{ color: '#4c0000', size: '50px' }}>
            <MdOutlineSportsGymnastics size={35} />
          </IconContext.Provider>
          <h1 className="header pl-2">Why choose us</h1>
        </div>
        <p className="px-6 lg:px-12">
          Our app is designed to help you get fit and healthy with our
          personalized workout plans. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate voluptatem rem consequatur eos magnam
          tempora! Ad sint corrupti amet reiciendis, dignissimos neque
          voluptates hic totam vel! Ab quo soluta quis.
        </p>
      </div>
      <div>
        <div className="flex justify-center align-middle">
          <IconContext.Provider value={{ color: '#4c0000', size: '50px' }}>
            <GiGymBag size={35} />
          </IconContext.Provider>
          <h1 className="header pl-2">How we can help</h1>
        </div>
        <p className="px-6 lg:px-12">
          Our app is designed to help you get fit and healthy with our
          personalized workout plans. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ut pariatur, quibusdam qui minus quos incidunt
          dignissimos quam, laboriosam accusantium cum fugiat quasi corrupti
          suscipit eius molestias atque est sint soluta?
        </p>
      </div>
    </section>
  )
}

export default AboutSection
