import Image from 'next/image'
import ShapeDivider from '@/components/shape-divider';
import { Backlight } from '@/components/ui/backlight';
const hero = () => {
  const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuC2kEQOPSHO76WVnHneOBu4DmbEFLgIp_94YmaTiQcOlCcSfDrqZU5qNhDBz7ZYOIGRF3tpoKUHsTJM3gnm1ZmNu2Kvu1sUKXCMF4dxwFYUpM6tJGACP25bEfsUzJg1tGeXrpWRy2pPU75C9PaIxEvvoYXh9_pbjUsOJNbod7tk3-3ZpkHwGyT4raBp1b3pDPRzDp12rHodlAZPsuCBTlD2rLs21a-qRH20V4nP-ZM2LGnUUO-Vlfle0NB9lLizTbQdyKsja7HQKRTl";

  return (
      <Backlight blur={6} className="@[480px]:p-4 w-full h-full top-0 left-0"> 
        <div className="relative flex min-h-120 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start overflow-clip justify-end px-4 pb-10 @[480px]:px-10"
      >  
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-auto min-w-full min-h-full max-w-none mx-auto rounded-xl shadow-2xl border inset-0 object-cover z-10 border-gray-200"
          >
            <source src="/video/7992523-hd_1920_1080_30fps.mp4" type="video/mp4" />
            <Image
              src={imageUrl} loading="eager"
              alt="Car in Garage"
              fill
              sizes="90vw"
              className="mx-auto rounded-xl shadow-2xl border inset-0 object-cover z-10 border-gray-200"
            />
          </video>

          <div className='absolute w-full h-full left-0 top-[75%] md:top-[60%] lg:top-[46%]'>
            <ShapeDivider className={"z-10 h-[100vw] bottom-0 opacity-45 mix-blend-exclusion"} position="bottom" />
          </div>
          
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-black/10 rounded-xl -z-10" />
          
          <div className="flex flex-col z-10 max-w-4xl mx-auto items-center gap-4 text-center">
            <h1
              className="text-white md:text-7xl text-balance text-shadow-2xl text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
            >
              Cuci Mobil Cepat &amp; Kilap
            </h1>
            <h2 className="text-white text-sm font-normal text-shadow-xl leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Mobil bersih, hati senang. Layanan cuci mobil profesional dengan hasil terbaik.
            </h2>
          </div>
          <div className="py-4 flex min-w-21 max-w-120 items-center justify-center h-10 px-4 @[480px]:h-12 @[480px]:px-5" />
        </div>
      </Backlight>
  )
}

export default hero