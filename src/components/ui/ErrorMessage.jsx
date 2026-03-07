import { AlertTriangle } from 'lucide-react'

export default function ErrorMessage({ message = "Failed to load data." }) {
  return (
    <div className="flex items-center gap-3 bg-red-500/10 border 
                    border-red-500/30 rounded-xl p-4 text-red-400">
      <AlertTriangle size={20} />
      <p className="text-sm">{message}</p>
    </div>
  )
}