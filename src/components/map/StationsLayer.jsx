// Fire+Police stations layer

import { CircleMarker, Popup } from 'react-leaflet'

const COLORS = {
  'Fire Station': '#ef4444',
  'Police Station': '#3b82f6',
}

export default function StationsLayer({ stations }) {
  return stations
    .filter(s => s.lat && s.lng)
    .map((station, idx) => (
      <CircleMarker
        key={`${station.category}-${idx}`}
        center={[station.lat, station.lng]}
        radius={10}
        fillColor={COLORS[station.category] ?? '#8b5cf6'}
        color="white"
        weight={2}
        fillOpacity={0.9}
        pathOptions={{
          fillColor: COLORS[station.category] ?? '#8b5cf6',
          color: 'white',
          weight: 2,
          fillOpacity: 0.9,
        }}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-bold">{station.Facility_Name}</p>
            <p>{station.Address}</p>
            <p className="mt-1 font-medium" style={{
              color: COLORS[station.category]
            }}>
              {station.category}
            </p>
          </div>
        </Popup>
      </CircleMarker>
    ))
}