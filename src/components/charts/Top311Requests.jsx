import { useState } from 'react'

const COLORS = [
  { bar: '#3b82f6', bg: 'bg-blue-500', glow: 'shadow-blue-500/20' },
  { bar: '#f97316', bg: 'bg-orange-500', glow: 'shadow-orange-500/20' },
  { bar: '#8b5cf6', bg: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  { bar: '#10b981', bg: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
  { bar: '#f43f5e', bg: 'bg-rose-500', glow: 'shadow-rose-500/20' },
]

export default function Top311Requests({ data }) {
  const [hovered, setHovered] = useState(null)
  const max = data[0]?.count || 1
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-1">
        Top 311 Request Types
      </h3>
      <p className="text-slate-400 text-xs mb-5">
        Most common citizen complaints — hover for details
      </p>

      <div className="space-y-3">
        {data.map(({ type, count }, idx) => {
          const color = COLORS[idx % COLORS.length]
          const pct = ((count / max) * 100).toFixed(0)
          const ofTotal = ((count / total) * 100).toFixed(1)
          const isHovered = hovered === idx

          return (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`rounded-lg p-3 transition-all duration-700 ease-in-out cursor-pointer
                ${isHovered
                  ? 'bg-slate-700 scale-[1.02]'
                  : 'bg-slate-750 hover:bg-slate-700/50'
                }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {/* Rank badge */}
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center 
                                text-white text-xs font-bold ${color.bg}`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 text-sm font-medium truncate max-w-[180px]">
                    {type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isHovered && (
                    <span className="text-xs text-slate-400 animate-fade-in">
                      {ofTotal}% of total
                    </span>
                  )}
                  <span
                    className="text-sm font-bold"
                    style={{ color: color.bar }}
                  >
                    {count.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: isHovered ? `${pct}%` : `${pct}%`,
                    backgroundColor: color.bar,
                    boxShadow: isHovered ? `0 0 8px ${color.bar}` : 'none',
                  }}
                />
              </div>

              {/* Expanded detail on hover */}
              {isHovered && (
                <div className="mt-2 flex gap-3 text-xs text-slate-400">
                  <span>
                    📊 {pct}% of top request
                  </span>
                  <span>
                    📋 {ofTotal}% of all complaints
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer total */}
      <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between 
                      text-xs text-slate-400">
        <span>Total complaints shown</span>
        <span className="text-white font-semibold">
          {total.toLocaleString()}
        </span>
      </div>
    </div>
  )
}