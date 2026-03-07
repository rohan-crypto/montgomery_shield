// Code violations layer

import { CircleMarker, Popup } from 'react-leaflet'

const TYPE_COLORS = {
  'NUISANCE': '#f97316',
  'DEMOLITION': '#ef4444',
  'default': '#eab308'
}

export default function ViolationsLayer({ violations }) {
  return violations
    .filter(v => v.lat && v.lng)
    .map((v, idx) => (
      <CircleMarker
        key={idx}
        center={[v.lat, v.lng]}
        radius={5}
        fillColor={TYPE_COLORS[v.CaseType] || TYPE_COLORS.default}
        color="white"
        weight={1}
        fillOpacity={0.8}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-bold">{v.CaseType}</p>
            <p>{v.Address1 || 'Address unavailable'}</p>
            <p>District: {v.CouncilDistrict}</p>
            <p>Status: {v.CaseStatus}</p>
            {v.ComplaintRem && (
              <p className="mt-1 text-xs italic">{v.ComplaintRem}</p>
            )}
          </div>
        </Popup>
      </CircleMarker>
    ))
}