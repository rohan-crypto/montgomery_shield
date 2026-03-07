import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Flame,
  Building2,
  TrendingUp,
  MapPin
} from 'lucide-react'

const links = [
  { to: '/overview',      icon: LayoutDashboard, label: 'Overview' },
  { to: '/emergency',     icon: Flame,           label: 'Emergency' },
  { to: '/neighbourhood', icon: Building2,        label: 'Neighbourhood' },
  { to: '/economic',      icon: TrendingUp,       label: 'Economic' },
  { to: '/stations',      icon: MapPin,           label: 'Stations' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop sidebar — pushes content */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0
          bg-slate-800 border-r border-slate-700
          transition-all duration-300 overflow-hidden py-4
          ${open ? 'w-56' : 'w-0 border-r-0 py-0'}
        `}
      >
        <SidebarContent onClose={null} />
      </aside>

      {/* Mobile sidebar — overlays content */}
      <aside
        className={`
          flex md:hidden flex-col flex-shrink-0
          bg-slate-800 border-r border-slate-700
          fixed top-[57px] left-0 bottom-0 z-[9999]
          transition-transform duration-300 w-56 py-4
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  )
}

function SidebarContent({ onClose }) {
  return (
    <>
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
             transition-all text-sm font-medium whitespace-nowrap ${
               isActive
                 ? 'bg-blue-600 text-white'
                 : 'text-slate-400 hover:bg-slate-700 hover:text-white'
             }`
          }
        >
          <Icon size={18} className="flex-shrink-0" />
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
    </>
  )
}