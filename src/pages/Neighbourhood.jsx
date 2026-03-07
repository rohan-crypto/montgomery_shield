// Violations + nuisance + rentals

import { Building2, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import MainMap from '../components/map/MainMap'
import ViolationsLayer from '../components/map/ViolationsLayer'
import NuisanceLayer from '../components/map/NuisanceLayer'
import ViolationsByDistrict from '../components/charts/ViolationsByDistrict'
import Top311Requests from '../components/charts/Top311Requests'
import { useNeighbourhood } from '../hooks/useNeighbourhood'
import { useState } from 'react'

export default function Neighbourhood() {
  const {
    violations,
    nuisance,
    requests311,
    violationsChartData,
    topRequestTypes,
    openRequests,
    inProgressRequests,
    loading,
    error,
  } = useNeighbourhood()

  const [activeLayer, setActiveLayer] = useState('both')

  if (loading) return <LoadingSpinner message="Loading neighbourhood data..." />
  if (error) return <ErrorMessage message="Failed to load neighbourhood data." />

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">
          Neighbourhood Health
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Code violations, environmental nuisance and citizen service requests
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Code Violations"
          value={violations.length.toLocaleString()}
          subtitle="Total recorded cases"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Nuisance Reports"
          value={nuisance.length.toLocaleString()}
          subtitle="Environmental complaints"
          icon={Building2}
          color="yellow"
        />
        <StatCard
          title="Open 311 Requests"
          value={openRequests.toLocaleString()}
          subtitle="Awaiting city response"
          icon={Clock}
          color="red"
        />
        <StatCard
          title="In Progress"
          value={inProgressRequests.toLocaleString()}
          subtitle="311 requests being handled"
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Map Layer Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm">Show:</span>
        {['both', 'violations', 'nuisance'].map(layer => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeLayer === layer
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {layer.charAt(0).toUpperCase() + layer.slice(1)}
          </button>
        ))}
        <div className="flex items-center gap-3 ml-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
            Code Violations
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
            Nuisance Reports
          </span>
        </div>
      </div>

      {/* Map */}
      <MainMap height="500px">
        {(activeLayer === 'both' || activeLayer === 'violations') && (
          <ViolationsLayer violations={violations} />
        )}
        {(activeLayer === 'both' || activeLayer === 'nuisance') && (
          <NuisanceLayer nuisance={nuisance} />
        )}
      </MainMap>

      {/* Charts + Top Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ViolationsByDistrict data={violationsChartData} />
        <Top311Requests data={topRequestTypes} />
      </div>

    </div>
  )
}