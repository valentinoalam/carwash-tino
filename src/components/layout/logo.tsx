// import { Car } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  const imageUrl = '/logo/carwash2.svg'
  return (
    <Link href="/" className="flex items-center justify-center" prefetch={false}>
      <div className="text-2xl h-6 w-6 group relative font-bold text-blue-900 flex items-center">
        <Image
          src={imageUrl}
          alt="Car in Garage"
          width={80} height={80}
          className="mx-auto min-w-16 min-h-16 shadow-2xl inset-0 object-cover overflow-visible z-10 group-hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <div className='absolute rounded-full bg-amber-400 border left-1/2 top-1/2 transition-all duration-300 ease-in-out group-hover:top-0 -translate-y-1/2 border-gray-200 w-12 h-12'></div>
          {/* <Car className=" absolute right-0 group-hover:right-1/2 transition-all duration-300 ease-in-out group-hover:opacity-75 translate-y-0.5 -z-0 group-hover:translate-x-1 opacity-90 text-blue-500 group-hover:text-blue-600" /> */}
          {/* <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text ml-2 text-xl font-bold text-transparent">
            Clean n Shine
          </span>
          <span className="text-blue-400 text-sm ml-1">PRO</span> */}
        </div>
    </Link>
  )
}

export default Logo