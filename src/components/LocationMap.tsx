import dynamic from "next/dynamic"

interface Location {
  id: number
  name: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
  hours: Record<string, string>
  features: string[]
  manager: string
  image: string
}

interface LocationMapProps {
  locations: Location[]
  onMarkerClick: (locationId: number) => void
  activeLocationId?: number
}

const DynamicMap = dynamic(() => import("./MapComponent"), {
  loading: () => (
    <div className="w-full h-96 bg-slate-800 rounded-xl flex items-center justify-center">
      <div className="text-slate-400">Loading map...</div>
    </div>
  ),
})

const LocationMap = ({ locations, onMarkerClick, activeLocationId }: LocationMapProps) => {

  return <DynamicMap locations={locations} onMarkerClick={onMarkerClick} activeLocationId={activeLocationId} />
}

export default LocationMap
