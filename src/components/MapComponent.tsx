/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Location } from "@/data/catalog"

interface MapComponentProps {
  locations: Location[]
  onMarkerClick: (locationId: number) => void
  activeLocationId?: number
}

// Mengatur tampilan peta: fokus ke cabang aktif, atau tampilkan semua cabang jika tidak ada yang dipilih
const MapController = ({
  bounds,
  activeLocation,
}: {
  bounds?: L.LatLngBoundsExpression
  activeLocation?: Location
}) => {
  const map = useMap()

  useEffect(() => {
    if (activeLocation) {
      map.flyTo([activeLocation.lat, activeLocation.lng], 15, { duration: 0.8 })
    } else if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50], duration: 0.8 })
    }
  }, [map, bounds, activeLocation])

  return null
}

const createCustomIcon = (isActive: boolean) =>
  L.divIcon({
    html: `
      <div style="
        background-color: ${isActive ? "#f59e0b" : "#64748b"};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

const MapComponent = ({ locations, onMarkerClick, activeLocationId }: MapComponentProps) => {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    })
  }, [])

  // Batas tampilan yang mencakup seluruh cabang
  const bounds = useMemo(() => {
    if (!locations || locations.length === 0) return undefined
    const latLngs = locations.map((loc) => [loc.lat, loc.lng] as [number, number])
    return L.latLngBounds(latLngs).pad(0.2)
  }, [locations])

  const activeLocation = useMemo(
    () => locations.find((loc) => loc.id === activeLocationId),
    [locations, activeLocationId]
  )

  // Pusat awal: tengah-tengah semua cabang (area Tangerang Selatan), fallback ke BSD City
  const defaultCenter: [number, number] = bounds
    ? [bounds.getCenter().lat, bounds.getCenter().lng]
    : [-6.3024, 106.6527]

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-xl">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        minZoom={10}
        // Batas geser peta diperlonggar agar zoom ke satu cabang tetap leluasa
        maxBounds={bounds?.pad(1)}
        maxBoundsViscosity={0.8}
        style={{ height: "100%", width: "100%", zIndex: "0" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController bounds={bounds} activeLocation={activeLocation} />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(activeLocationId === location.id)}
            eventHandlers={{
              click: () => onMarkerClick(location.id),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-slate-900 mb-1">{location.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{location.address}</p>
                <p className="text-sm text-slate-700 mb-2">{location.phone}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-sky-600 underline"
                >
                  Petunjuk arah
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent