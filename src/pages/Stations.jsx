import { useState, useRef } from 'react'
import { MapPin, Flame, Shield, AlertTriangle } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import MainMap from '../components/map/MainMap'
import StationsLayer from '../components/map/StationsLayer'
import { useStations } from '../hooks/useStations'

export default function Stations() {
  const { stations, fireStations, policeStations, loading, error } = useStations()

  const [activeLayer, setActiveLayer] = useState('both')
  const [fireScrolled, setFireScrolled] = useState(false)
  const [policeScrolled, setPoliceScrolled] = useState(false)
  const fireRef = useRef(null)
  const policeRef = useRef(null)

  if (loading) return <LoadingSpinner message="Loading station data..." />
  if (error) return <ErrorMessage message="Failed to load station data." />

  const visibleStations = activeLayer === 'both'
    ? stations
    : activeLayer === 'fire'
    ? fireStations
    : policeStations

  const layerButtons = [
    { key: 'both',   label: 'Both',    count: stations.length },
    { key: 'fire',   label: 'Fire',    count: fireStations.length },
    { key: 'police', label: 'Police',  count: policeStations.length },
  ]

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-bold text-white">Station Coverage Map</h2>
        <p className="text-slate-400 text-sm mt-1">
          Fire and police facility locations across Montgomery
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Facilities" value={stations.length} subtitle="Fire + Police combined" icon={MapPin} color="blue" />
        <StatCard title="Fire Stations" value={fireStations.length} subtitle="Active fire stations" icon={Flame} color="red" />
        <StatCard title="Police Facilities" value={policeStations.length} subtitle="Stations + substations" icon={Shield} color="blue" />
        <StatCard title="Officers (2024)" value="280" subtitle="Down 42% from 2020" icon={AlertTriangle} color="yellow" trend={{ up: true, text: 'Critical staffing shortage' }} />
      </div>

      {/* Layer Toggle with counts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-400 text-sm">Show:</span>
        {layerButtons.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveLayer(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                        font-medium transition-all border ${
              activeLayer === key
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600'
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeLayer === key ? 'bg-white/20' : 'bg-slate-600'
            }`}>
              {count}
            </span>
          </button>
        ))}
        <div className="flex items-center gap-3 ml-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            Fire Station
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            Police Facility
          </span>
        </div>
      </div>

      <MainMap height="550px">
        <StationsLayer stations={visibleStations} />
      </MainMap>

      {/* Station Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Flame size={16} className="text-red-400" />
            Fire Stations
            <span className="ml-auto text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full">
              {fireStations.length} stations
            </span>
          </h3>
          <div className="relative">
            <div
              ref={fireRef}
              className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 scroll-smooth"
              style={{ scrollbarColor: '#ef4444 #1e293b' }}
              onScroll={() => {
                const el = fireRef.current
                setFireScrolled(el.scrollTop + el.clientHeight >= el.scrollHeight - 10)
              }}
            >
              {fireStations.map((s, idx) => (
                <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 cursor-default group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-pulse flex-shrink-0"></span>
                    <span className="text-red-400 text-xs font-bold">
                      {s.Facility_Name.replace(/([a-zA-Z])(\d)/g, '$1 $2')}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-snug">{s.Address}</p>
                </div>
              ))}
            </div>
            {!fireScrolled && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none rounded-b-xl"></div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield size={16} className="text-blue-400" />
            Police Facilities
            <span className="ml-auto text-xs bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2 py-0.5 rounded-full">
              {policeStations.length} facilities
            </span>
          </h3>
          <div className="relative">
            <div
              ref={policeRef}
              className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 scroll-smooth"
              style={{ scrollbarColor: '#3b82f6 #1e293b' }}
              onScroll={() => {
                const el = policeRef.current
                setPoliceScrolled(el.scrollTop + el.clientHeight >= el.scrollHeight - 10)
              }}
            >
              {policeStations.map((s, idx) => (
                <div key={idx} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 cursor-default group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-pulse flex-shrink-0"></span>
                    <span className="text-blue-400 text-xs font-bold leading-snug">{s.Facility_Name}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-snug">{s.Address}</p>
                </div>
              ))}
            </div>
            {!policeScrolled && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none rounded-b-xl"></div>
            )}
          </div>
        </div>

      </div>

      {/* Staffing Crisis Banner */}
      <div className="bg-gradient-to-r from-red-900/30 to-slate-800 border border-red-500/20 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Critical Staffing Crisis</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Montgomery has {stations.length} fire and police facilities across the city — but only 280 active police officers to staff them, down from 485 in 2020. That's a 42% collapse in 4 years. Officers are leaving at 2-3 per week. More facilities exist than can be adequately staffed, creating dangerous coverage gaps across districts.
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/30">280 Active Officers</span>
              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500/30">Down from 485 in 2020</span>
              <span className="text-xs bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full border border-slate-500/30">2-3 Leaving Per Week</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}