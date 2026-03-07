// Headline stat cards

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  const colors = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  }

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm font-medium">{title}</span>
        {Icon && <Icon size={20} />}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subtitle && (
        <p className="text-xs text-slate-400">{subtitle}</p>
      )}
      {trend && (
        <p className={`text-xs mt-1 ${trend.up ? 'text-red-400' : 'text-green-400'}`}>
          {trend.up ? '▲' : '▼'} {trend.text}
        </p>
      )}
    </div>
  )
}