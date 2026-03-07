import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Flame,
  Building2,
  TrendingUp,
  MapPin
} from 'lucide-react'

const links = [
  { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/emergency', icon: Flame, label: 'Emergency' },
  { to: '/neighbourhood', icon: Building2, label: 'Neighbourhood' },
  { to: '/economic', icon: TrendingUp, label: 'Economic' },
  { to: '/stations', icon: MapPin, label: 'Stations' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 bg-slate-800 border-r border-slate-700 flex flex-col py-4">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all text-sm font-medium ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}

      <div className="mt-auto mx-2 p-3 bg-slate-700 rounded-lg">
        <p className="text-xs text-slate-400 leading-relaxed">
          Data sourced from{' '}
          <span className="text-blue-400">
            City of Montgomery Open Data Portal
          </span>
        </p>
      </div>
    </aside>
  )
}