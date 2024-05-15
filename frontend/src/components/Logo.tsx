import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

function Logo({ className }: LogoProps) {
  return (
    <div
      className={twMerge(
        'absolute left-10 top-7 text-4xl font-bold text-white',
        className,
      )}
    >
      <span className="text-shadow">GymApp</span>
    </div>
  )
}

export default Logo
