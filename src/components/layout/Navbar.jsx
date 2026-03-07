import { Shield, Menu, X } from 'lucide-react'

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-4 py-3
                    flex items-center justify-between z-50 flex-shrink-0">
      <div className="flex items-center gap-3">

        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="text-slate-400 hover:text-white transition-colors
                     p-1 rounded-lg hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen
            ? <X size={22} />
            : <Menu size={22} />
          }
        </button>

        <Shield className="text-blue-400 flex-shrink-0" size={24} />
        <div>
          <h1 className="text-white font-bold text-base md:text-lg leading-none">
            Montgomery Shield
          </h1>
          <p className="text-slate-400 text-xs hidden sm:block">
            Birthplace of Civil Rights · Public Safety Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse
                         flex-shrink-0"></span>
        <span className="text-slate-400 text-xs sm:text-sm">Live Data</span>
      </div>
    </nav>
  )
}