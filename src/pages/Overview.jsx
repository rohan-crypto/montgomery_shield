// Dashboard + headline stats
 
// src/pages/Overview.jsx
import {
  Phone, Flame, AlertTriangle,
  TrendingDown, Building2, DollarSign
} from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import { use911Calls } from '../hooks/use911Calls'
import { useFireData } from '../hooks/useFireData'

export default function Overview() {
  const { latestEmergencyTotal, loading: loading911 } = use911Calls()
  const {
    avgResponseTime,
    nfpaRatio,
    totalPropertySaved,
    totalPropertyLost,
    loading: loadingFire
  } = useFireData()

  const loading = loading911 || loadingFire

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-800 
                      rounded-xl border border-blue-500/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          Montgomery Shield
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl">
          From the birthplace of the modern Civil Rights Movement to the frontier 
          of AI-powered public safety. Montgomery Shield uses real-time open data 
          to strengthen emergency response, reduce crime, and attract the investment 
          this city deserves.
        </p>
        <div className="flex gap-4 mt-4">
          <span className="text-xs bg-blue-500/20 text-blue-300 
                           px-3 py-1 rounded-full border border-blue-500/30">
            9 Live Data Sources
          </span>
          <span className="text-xs bg-green-500/20 text-green-300 
                           px-3 py-1 rounded-full border border-green-500/30">
            Montgomery Open Data
          </span>
          <span className="text-xs bg-purple-500/20 text-purple-300 
                           px-3 py-1 rounded-full border border-purple-500/30">
            Real-Time Updates
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="text-slate-400 text-sm">Loading live data...</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Emergency Calls (Feb 2026)"
            value={latestEmergencyTotal.toLocaleString()}
            subtitle="Incoming 911 emergency calls"
            icon={Phone}
            color="blue"
            trend={{ up: true, text: 'High demand on understaffed force' }}
          />
          <StatCard
            title="Avg Fire Response Time"
            value={`${Math.round(avgResponseTime / 60)}m ${avgResponseTime % 60}s`}
            subtitle={`${nfpaRatio}x NFPA 4-minute standard`}
            icon={Flame}
            color="red"
            trend={{ up: true, text: 'Above safe response threshold' }}
          />
          <StatCard
            title="Police Officers (2024)"
            value="280"
            subtitle="Down from 485 in 2020"
            icon={AlertTriangle}
            color="yellow"
            trend={{ up: true, text: '42% drop in 4 years' }}
          />
          <StatCard
            title="Property Saved by Fire Dept"
            value={`$${(totalPropertySaved / 1e6).toFixed(1)}M`}
            subtitle="Estimated value protected"
            icon={DollarSign}
            color="green"
            trend={{ up: false, text: 'Fire dept protecting city assets' }}
          />
          <StatCard
            title="Property Lost to Fires"
            value={`$${(totalPropertyLost / 1e6).toFixed(1)}M`}
            subtitle="Estimated value destroyed"
            icon={TrendingDown}
            color="red"
            trend={{ up: true, text: 'Economic cost of delayed response' }}
          />
          <StatCard
            title="Meta Investment Arriving"
            value="$1.5B"
            subtitle="Data centre due end of 2026"
            icon={Building2}
            color="purple"
            trend={{ up: false, text: 'Safety critical for investment' }}
          />
        </div>
      )}

      {/* Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            The Crisis
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              Police force down 42% — from 485 to 280 officers since 2020
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              Crime rate 1.65x the national average
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              Fire response times running {nfpaRatio}x above NFPA safe standard
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              1 in 36 residents are crime victims annually
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Building2 size={16} className="text-green-400" />
            The Opportunity
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              $1.5B Meta data centre arriving end of 2026
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              AWS and Google planning Montgomery offices
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Maxwell and Gunter airbases — established tech hubs
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Safer city = stronger investment case for tech giants
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}