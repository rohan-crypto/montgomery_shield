// Environmental nuisance layer

import { CircleMarker, Popup } from 'react-leaflet'

export default function NuisanceLayer({ nuisance }) {
  return nuisance
    .filter(n => n.lat && n.lng)
    .map((n, idx) => (
      <CircleMarker
        key={idx}
        center={[n.lat, n.lng]}
        radius={5}
        fillColor="#8b5cf6"
        color="white"
        weight={1}
        fillOpacity={0.8}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-bold">{n.Type}</p>
            <p>{n.Address}</p>
            {n.Remarks && (
              <p className="mt-1 text-xs italic">{n.Remarks}</p>
            )}
          </div>
        </Popup>
      </CircleMarker>
    ))
}