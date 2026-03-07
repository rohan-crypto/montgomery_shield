import { useState, useMemo } from 'react'
import { Phone, Flame, Clock, AlertTriangle } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import MainMap from '../components/map/MainMap'
import FireLayer from '../components/map/FireLayer'
import CallsTrendChart from '../components/charts/CallsTrendChart'
import ResponseTimeChart from '../components/charts/ResponseTimeChart'
import { use911Calls } from '../hooks/use911Calls'
import { useFireData } from '../hooks/useFireData'

const FILTER_BUTTONS = [
  { label: 'Building Fire',        color: '#ef4444', match: t => t === 'Building fire' },
  { label: 'EMS / Medical',        color: '#3b82f6', match: t => t === 'EMS call, excluding vehicle accident with injury' || t === 'Assist invalid' || t === 'Medical assist, assist EMS crew' || t === 'Person in distress, other' || t === 'Rescue or EMS standby' },
  { label: 'Vehicle Fire',         color: '#f97316', match: t => t === 'Passenger vehicle fire' || t === 'Off-road vehicle or heavy equipment fire' || t === 'Mobile property (vehicle) fire, other' },
  { label: 'Rubbish / Vegetation', color: '#eab308', match: t => t === 'Outside rubbish, trash or waste fire' || t === 'Outside rubbish fire, other' || t === 'Trash or rubbish fire, contained' || t === 'Natural vegetation fire, other' || t === 'Brush or brush-and-grass mixture fire' || t === 'Cooking fire, confined to container' },
  { label: 'Alarm / False',        color: '#8b5cf6', match: t => t === 'Local alarm system, malicious false alarm' || t === 'Alarm system activation, no fire - unintentional' || t === 'Malicious, mischievous false call, other' || t === 'Smoke detector activation due to malfunction' || t === 'Alarm system sounded due to malfunction' || t === 'Detector activation, no fire - unintentional' || t === 'Smoke detector activation, no fire - unintentional' || t === 'Heat detector activation due to malfunction' || t === 'Sprinkler activation, no fire - unintentional' || t === 'Sprinkler activation due to malfunction' || t === 'Bomb scare - no bomb' },
  { label: 'Vehicle Accident',     color: '#06b6d4', match: t => t === 'Motor vehicle accident with no injuries.' || t === 'Motor vehicle accident with injuries' || t === 'Motor vehicle/pedestrian accident (MV Ped)' },
  { label: 'Other',                color: '#64748b', match: t => !['Building fire','EMS call, excluding vehicle accident with injury','Assist invalid','Medical assist, assist EMS crew','Person in distress, other','Rescue or EMS standby','Passenger vehicle fire','Off-road vehicle or heavy equipment fire','Mobile property (vehicle) fire, other','Outside rubbish, trash or waste fire','Outside rubbish fire, other','Trash or rubbish fire, contained','Natural vegetation fire, other','Brush or brush-and-grass mixture fire','Cooking fire, confined to container','Local alarm system, malicious false alarm','Alarm system activation, no fire - unintentional','Malicious, mischievous false call, other','Smoke detector activation due to malfunction','Alarm system sounded due to malfunction','Detector activation, no fire - unintentional','Smoke detector activation, no fire - unintentional','Heat detector activation due to malfunction','Sprinkler activation, no fire - unintentional','Sprinkler activation due to malfunction','Bomb scare - no bomb','Motor vehicle accident with no injuries.','Motor vehicle accident with injuries','Motor vehicle/pedestrian accident (MV Ped)'].includes(t) },
]

export default function Emergency() {
  const [activeFilters, setActiveFilters] = useState([])

  const { latestEmergencyTotal, chartData, loading: loading911, error: error911 } = use911Calls()
  const { incidents, avgResponseTime, nfpaRatio, totalPropertyLost, loading: loadingFire, error: errorFire } = useFireData()

  const counts = useMemo(() => {
    const validIncidents = incidents.filter(i => i.lat && i.lng)
    const result = { All: validIncidents.length }
    FILTER_BUTTONS.forEach(({ label, match }) => {
      result[label] = validIncidents.filter(i => match(i.Incident_Type || '')).length
    })
    return result
  }, [incidents])

  if (loading911 || loadingFire) return <LoadingSpinner />
  if (error911 || errorFire) return <ErrorMessage />

  function toggleFilter(label) {
    setActiveFilters(prev =>
      prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
    )
  }

  const allActive = activeFilters.length === 0

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-bold text-white">Emergency Response Intelligence</h2>
        <p className="text-slate-400 text-sm mt-1">Live 911 call data and fire rescue incident analysis</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Emergency Calls" value={latestEmergencyTotal.toLocaleString()} subtitle="Feb 2026 incoming" icon={Phone} color="blue" />
        <StatCard title="Avg Response Time" value={`${Math.round(avgResponseTime / 60)}m ${avgResponseTime % 60}s`} subtitle={`${nfpaRatio}x NFPA standard`} icon={Clock} color="red" />
        <StatCard title="Total Incidents" value={incidents.length.toLocaleString()} subtitle="Fire rescue incidents" icon={Flame} color="yellow" />
        <StatCard title="Property Lost" value={`$${(totalPropertyLost / 1e6).toFixed(1)}M`} subtitle="Estimated fire damage" icon={AlertTriangle} color="red" />
      </div>

      <div>
        <h3 className="text-white font-semibold flex items-center gap-2 mb-1">
          <Flame size={16} className="text-orange-400" />
          Fire Incident Locations
        </h3>
        <p className="text-slate-400 text-xs mb-3">
          Showing latest 1,000 incidents
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {/* All button */}
          <button
            onClick={() => setActiveFilters([])}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border
                        transition-all duration-200 ${
              allActive
                ? 'bg-white/10 text-white border-white/30'
                : 'text-slate-400 border-slate-600 hover:border-slate-400'
            }`}
          >
            All
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              allActive ? 'bg-white/20' : 'bg-slate-600'
            }`}>
              {counts.All}
            </span>
          </button>

          {/* Category filters */}
          {FILTER_BUTTONS.map(({ label, color }) => {
            const isActive = activeFilters.includes(label)
            return (
              <button
                key={label}
                onClick={() => toggleFilter(label)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5
                            rounded-lg border transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white border-white/30'
                    : 'text-slate-400 border-slate-600 hover:border-slate-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20' : 'bg-slate-600'
                }`}>
                  {counts[label] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        <MainMap height="500px">
          <FireLayer incidents={incidents} activeFilters={activeFilters} />
        </MainMap>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CallsTrendChart data={chartData} />
        <ResponseTimeChart incidents={incidents} />
      </div>

    </div>
  )
}