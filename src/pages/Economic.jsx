// Business licenses + property data

import {
  TrendingUp, DollarSign,
  Building2, ShieldCheck
} from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import PropertySavedChart from '../components/charts/PropertySavedChart'
import BusinessGrowthChart from '../components/charts/BusinessGrowthChart'
import { useEconomic } from '../hooks/useEconomic'

export default function Economic() {
  const {
    topCategories,
    byYearChartData,
    propertySavedChartData,
    totalBusinesses,
    totalSaved,
    totalLost,
    avgSavedPct,
    loading,
    error,
  } = useEconomic()

  if (loading) return <LoadingSpinner message="Loading economic data..." />
  if (error) return <ErrorMessage message="Failed to load economic data." />

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">
          Economic Pulse
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Business activity, property impact and investment signals
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Businesses"
          value={totalBusinesses.toLocaleString()}
          subtitle="Licensed in Montgomery"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Property Saved"
          value={`$${(totalSaved / 1e6).toFixed(1)}M`}
          subtitle="Protected by fire dept"
          icon={ShieldCheck}
          color="green"
        />
        <StatCard
          title="Property Lost"
          value={`$${(totalLost / 1e6).toFixed(1)}M`}
          subtitle="Fire damage to city"
          icon={DollarSign}
          color="red"
        />
        <StatCard
          title="Avg Property Saved"
          value={`${avgSavedPct}%`}
          subtitle="Of at-risk value protected"
          icon={TrendingUp}
          color="yellow"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PropertySavedChart data={propertySavedChartData} />
        <BusinessGrowthChart data={byYearChartData} />
      </div>

      {/* Top Business Categories */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-semibold">
            Top Business Categories in Montgomery
          </h3>
          <span className="text-xs bg-blue-500/10 border border-blue-500/30 
                          text-blue-400 px-3 py-1 rounded-full font-medium">
            {topCategories.reduce((sum, c) => sum + c.count, 0).toLocaleString()} total licenses
          </span>
        </div>
        <p className="text-slate-400 text-xs mb-5">
          Active licensed business sectors — economic diversity indicator
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {topCategories.map(({ category, count }, idx) => {
            const colors = [
              { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' },
              { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-500' },
              { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500' },
              { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
              { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500' },
              { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' },
              { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-500' },
              { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', dot: 'bg-pink-500' },
            ]
            const c = colors[idx % colors.length]
            const maxCount = topCategories[0].count
            const total = topCategories.reduce((sum, c) => sum + c.count, 0)
            const pct = Math.round((count / total) * 100)

            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 ${c.bg} ${c.border} 
                            hover:scale-[1.03] transition-all duration-300 
                            cursor-default group`}
              >
                {/* Rank + count */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
                                  ${c.bg} ${c.border} border ${c.text}`}>
                    #{idx + 1}
                  </span>
                  <span className={`text-lg font-bold ${c.text}`}>
                    {count.toLocaleString()}
                  </span>
                </div>

                {/* Category name */}
                <p className="text-white text-xs font-medium leading-snug mb-3 
                              min-h-[2.5rem] line-clamp-2">
                  {category === 'Unknown' ? 'Unclassified Business' : category}
                </p>

                {/* Mini progress bar */}
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${c.dot} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">{pct}% of top licenses</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Meta Investment Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 
                      border border-purple-500/30 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center 
                          justify-center flex-shrink-0">
            <Building2 size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">
              $1.5 Billion Meta Investment — Arriving 2026
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Meta's 1.3 million sq ft AI data centre campus is Montgomery's 
              biggest economic opportunity in decades. AWS and Google are following. 
              But global tech companies require safe, stable cities to operate. 
              Every improvement in public safety directly strengthens Montgomery's 
              investment case and protects thousands of incoming jobs.
            </p>
            <div className="flex gap-3 mt-3">
              <span className="text-xs bg-purple-500/20 text-purple-300 
                               px-3 py-1 rounded-full border border-purple-500/30">
                Meta — $1.5B
              </span>
              <span className="text-xs bg-blue-500/20 text-blue-300 
                               px-3 py-1 rounded-full border border-blue-500/30">
                AWS — Planned
              </span>
              <span className="text-xs bg-green-500/20 text-green-300 
                               px-3 py-1 rounded-full border border-green-500/30">
                Google — Planned
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}