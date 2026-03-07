// Core Leaflet map

import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MONTGOMERY_CENTER, DEFAULT_ZOOM } from '../../constants/mapConfig'

export default function MainMap({ children, height = "550px" }) {
  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-slate-700">
      <MapContainer
        center={MONTGOMERY_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  )
}