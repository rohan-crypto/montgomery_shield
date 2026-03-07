export default function LoadingSpinner({ message = "Loading live data..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent 
                      rounded-full animate-spin"></div>
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  )
}