import { CircleMarker, Popup } from 'react-leaflet'

const FILTER_OPTIONS = [
  {
    label: 'Building Fire',
    color: '#ef4444',
    match: t => t === 'Building fire',
  },
  {
    label: 'EMS / Medical',
    color: '#3b82f6',
    match: t =>
      t === 'EMS call, excluding vehicle accident with injury' ||
      t === 'Assist invalid' ||
      t === 'Medical assist, assist EMS crew' ||
      t === 'Person in distress, other' ||
      t === 'Rescue or EMS standby',
  },
  {
    label: 'Vehicle Fire',
    color: '#f97316',
    match: t =>
      t === 'Passenger vehicle fire' ||
      t === 'Off-road vehicle or heavy equipment fire' ||
      t === 'Mobile property (vehicle) fire, other',
  },
  {
    label: 'Rubbish / Vegetation',
    color: '#eab308',
    match: t =>
      t === 'Outside rubbish, trash or waste fire' ||
      t === 'Outside rubbish fire, other' ||
      t === 'Trash or rubbish fire, contained' ||
      t === 'Natural vegetation fire, other' ||
      t === 'Brush or brush-and-grass mixture fire' ||
      t === 'Cooking fire, confined to container',
  },
  {
    label: 'Alarm / False',
    color: '#8b5cf6',
    match: t =>
      t === 'Local alarm system, malicious false alarm' ||
      t === 'Alarm system activation, no fire - unintentional' ||
      t === 'Malicious, mischievous false call, other' ||
      t === 'Smoke detector activation due to malfunction' ||
      t === 'Alarm system sounded due to malfunction' ||
      t === 'Detector activation, no fire - unintentional' ||
      t === 'Smoke detector activation, no fire - unintentional' ||
      t === 'Heat detector activation due to malfunction' ||
      t === 'Sprinkler activation, no fire - unintentional' ||
      t === 'Sprinkler activation due to malfunction' ||
      t === 'Bomb scare - no bomb',
  },
  {
    label: 'Vehicle Accident',
    color: '#06b6d4',
    match: t =>
      t === 'Motor vehicle accident with no injuries.' ||
      t === 'Motor vehicle accident with injuries' ||
      t === 'Motor vehicle/pedestrian accident (MV Ped)',
  },
  {
    label: 'Other',
    color: '#64748b',
    match: () => true,
  },
]

function getColor(type) {
  for (const opt of FILTER_OPTIONS) {
    if (opt.label === 'Other') continue
    if (opt.match(type)) return opt.color
  }
  return '#64748b'
}

export default function FireLayer({ incidents, activeFilters }) {
  const allActive = !activeFilters || activeFilters.length === 0

  const filtered = incidents
  .filter(i => i.lat && i.lng)
  .filter(i => {
    if (allActive) return true
    const type = i.Incident_Type || ''
    return activeFilters.some(label => {
      if (label === 'Other') {
        // Show only incidents that don't match ANY specific category
        const specificOptions = FILTER_OPTIONS.filter(f => f.label !== 'Other')
        return !specificOptions.some(opt => opt.match(type))
      }
      const opt = FILTER_OPTIONS.find(f => f.label === label)
      return opt ? opt.match(type) : false
    })
  })

  return filtered.map((incident, idx) => (
    <CircleMarker
      key={`${activeFilters.join('-')}-${idx}`}
      center={[incident.lat, incident.lng]}
      radius={6}
      fillColor={getColor(incident.Incident_Type || '')}
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
            <p>
              Response: {Math.round(incident.Unit_Response_Time / 60)}m{' '}
              {incident.Unit_Response_Time % 60}s
            </p>
          )}
        </div>
      </Popup>
    </CircleMarker>
  ))
}