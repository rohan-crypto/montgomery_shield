// Fire incidents layer

import { CircleMarker, Popup } from 'react-leaflet'
import { INCIDENT_COLORS } from '../../constants/mapConfig'

export default function FireLayer({ incidents }) {
  return incidents
    .filter(i => i.lat && i.lng)
    .map((incident, idx) => (
      <CircleMarker
        key={idx}
        center={[incident.lat, incident.lng]}
        radius={6}
        fillColor={INCIDENT_COLORS[incident.Incident_Type] || INCIDENT_COLORS.default}
        color="white"
        weight={1}
        fillOpacity={0.8}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-bold">{incident.Incident_Type}</p>
            <p>{incident.Location_Street_Address}</p>
            <p>District: {incident.District}</p>
            {incident.Unit_Response_Time && (
              <p>Response: {Math.round(incident.Unit_Response_Time / 60)}m {incident.Unit_Response_Time % 60}s</p>
            )}
          </div>
        </Popup>
      </CircleMarker>
    ))
}