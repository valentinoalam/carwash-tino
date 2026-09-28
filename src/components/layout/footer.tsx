// import { Instagram, Facebook } from 'lucide-react'
import React from 'react'
import GradientBlinds from '../GradientBlinds'
import Link from 'next/link'
import Image from 'next/image'

const footer = () => {
  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="flex flex-1 justify-center py-5"></div>
      {/* <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        <a className="text-[#5a778c] text-base font-normal leading-normal min-w-40" href="#">Home</a>
        <a className="text-[#5a778c] text-base font-normal leading-normal min-w-40" href="#">Services</a>
        <a className="text-[#5a778c] text-base font-normal leading-normal min-w-40" href="#">Pricing</a>
        <a className="text-[#5a778c] text-base font-normal leading-normal min-w-40" href="#">Contact</a>
      </div> */}
      {/* Footer */}
      <footer className="flex relative justify-center bg-gray-950 text-white gap-6 px-5 py-10 text-center @container">
        {/* Animated Gradient Background */}
        <div className="absolute mix-blend-plus-lighter inset-0 w-full h-full -z-0 flex items-center justify-center">
          <GradientBlinds
            gradientColors={[ "#1e3a8a", "#2563eb", "#1d4ed8"]}
            angle={15}
            noise={0.25}
            blindCount={13}
            blindMinWidth={50}
            spotlightRadius={0.38}
            spotlightSoftness={1.6}
            spotlightOpacity={0.42}
            mouseDampening={0.15}
            distortAmount={10}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>
        <div className="flex max-w-[960px] flex-1 flex-col">
        </div>
        <div className="container mx-auto z-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className='relative flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href="/" className="flex items-center justify-center" prefetch={false}>
                  <div className="text-2xl h-46 w-46 group relative font-bold text-blue-900 flex items-center">
                    <Image
                      src="/logo/carwash.svg"
                      alt="Car in Garage"
                      height={150} width={150}
                      className="mx-auto min-w-20 min-h-20 w-auto h-auto aspect-square shadow-2xl inset-0 object-cover overflow-visible group-hover:scale-110 transition-all duration-300 ease-in-out"
                    />
                    </div>
                </Link>
              <div className="flex flex-col items-center mb-4">
                <p className="text-stone-400 mb-4">
                  Premium car wash and detailing services with a commitment to excellence and environmental responsibility.
                </p>
                <div className="flex flex-wrap justify-center gap-4 space-x-4">
                  <a href="#" className="text-stone-400 hover:text-white transition-colors">
                      <div className="text-[#5a778c]" data-icon="TwitterLogo" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                          d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"
                          ></path>
                      </svg>
                      </div>
                  </a>
                  <a href="#" className="text-stone-400 hover:text-white transition-colors">
                      <div className="text-[#5a778c]" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                          d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
                          ></path>
                      </svg> */}
                      {/* <Instagram className="h-6 w-6" /> */}
                      </div>
                  </a>
                  <a href="#" className="text-stone-400 hover:text-white transition-colors">
                      <div className="text-[#5a778c]" data-icon="FacebookLogo" data-size="24px" data-weight="regular">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                          d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"
                          ></path>
                      </svg> */}
                        {/* <Facebook className="h-6 w-6" /> */}
                      </div>
                  </a>
                </div>
              </div>
              
            </div>
            <div className='flex flex-wrap justify-around w-full grow-1 flex-1'>
              <div className='w-max flex flex-col'>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-stone-400">
                  <li><a href="#" className="hover:text-white text-shadow-lg/30 transition-colors">Express Wash</a></li>
                  <li><a href="#" className="hover:text-white text-shadow-lg/30 transition-colors">Premium Detail</a></li>
                  <li><a href="#" className="hover:text-white text-shadow-lg/30 transition-colors">Ceramic Coating</a></li>
                  <li><a href="#" className="hover:text-white text-shadow-lg/30 transition-colors">Interior Cleaning</a></li>
                </ul>
              </div>

              <div className='w-max flex flex-col'>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link href="/blog" className="hover:text-white transition-colors">
                      Car Care Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Premium Wash
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Interior Detailing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Ceramic Coating
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Express Wash
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-stone-400">
              <p>1234 Sunset Boulevard</p>
              <p>Los Angeles, CA 90028</p>
              <p>(310) 555-1234</p>
              <p>info@aquashine.com</p>
              </div>
            </div> */}
          </div>

          <div className="border-t backdrop-blur-sm border-stone-400/20 pt-8 text-center text-stone-400">
            <p className="text-[#5a778c] text-base font-normal leading-normal">&copy; 2025 Shine Car Wash. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default footer