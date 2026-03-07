import { Shield } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <Shield className="text-blue-400" size={28} />
        <div>
          <h1 className="text-white font-bold text-lg leading-none">
            Montgomery Shield
          </h1>
          <p className="text-slate-400 text-xs">
            Birthplace of Civil Rights · Public Safety Intelligence
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-slate-400 text-sm">Live Data</span>
      </div>
    </nav>
  )
}