// 911 + Fire map + response times

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

export default function Emergency() {
  const {
    latestEmergencyTotal,
    chartData,
    loading: loading911,
    error: error911
  } = use911Calls()

  const {
    incidents,
    avgResponseTime,
    nfpaRatio,
    totalPropertyLost,
    loading: loadingFire,
    error: errorFire
  } = useFireData()

  if (loading911 || loadingFire) return <LoadingSpinner />
  if (error911 || errorFire) return <ErrorMessage />

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">
          Emergency Response Intelligence
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Live 911 call data and fire rescue incident analysis
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Emergency Calls"
          value={latestEmergencyTotal.toLocaleString()}
          subtitle="Feb 2026 incoming"
          icon={Phone}
          color="blue"
        />
        <StatCard
          title="Avg Response Time"
          value={`${Math.round(avgResponseTime / 60)}m ${avgResponseTime % 60}s`}
          subtitle={`${nfpaRatio}x NFPA standard`}
          icon={Clock}
          color="red"
        />
        <StatCard
          title="Total Incidents"
          value={incidents.length.toLocaleString()}
          subtitle="Fire rescue incidents"
          icon={Flame}
          color="yellow"
        />
        <StatCard
          title="Property Lost"
          value={`$${(totalPropertyLost / 1e6).toFixed(1)}M`}
          subtitle="Estimated fire damage"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Map */}
      <div>
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Flame size={16} className="text-orange-400" />
          Fire Incident Locations
        </h3>
        <MainMap height="550px">
          <FireLayer incidents={incidents} />
        </MainMap>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CallsTrendChart data={chartData} />
        <ResponseTimeChart incidents={incidents} />
      </div>

    </div>
  )
}