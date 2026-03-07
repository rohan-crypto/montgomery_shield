import { useState, useEffect } from 'react'
import { fetchMontgomeryNews } from '../../api/liveNews'
import { Newspaper, X, ExternalLink, RefreshCw } from 'lucide-react'

const COLOR_MAP = {
  red: 'bg-red-500/10 text-red-400 border-red-500/30',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  green: 'bg-green-500/10 text-green-400 border-green-500/30',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
}

const DOT_MAP = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  slate: 'bg-slate-500',
}

export default function LiveNewsFeed() {
  const [open, setOpen] = useState(false)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState(null)
  const [error, setError] = useState(false)

  async function loadNews() {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchMontgomeryNews()
      setNews(data)
      setLastFetched(new Date().toLocaleTimeString())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      loadNews()
      // Auto refresh every 30 minutes
      const interval = setInterval(loadNews, 30 * 60 * 1000)
      return () => clearInterval(interval)
    }, [])

  return (
    <div className="fixed top-[60px] right-4 z-[1000] w-80">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="ml-auto flex items-center gap-2 bg-slate-800 border border-slate-600
                   hover:border-blue-500/50 px-3 py-2 rounded-lg shadow-lg
                   transition-all duration-300 group w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Newspaper size={15} className="text-blue-400" />
          <span className="text-white text-xs font-medium">
            Live Montgomery News
          </span>
          {!loading && news.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse">
            </span>
          )}
        </div>
        <span className="text-slate-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="mt-1 bg-slate-800 border border-slate-700 rounded-xl
                        shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3
                          border-b border-slate-700">
            <div>
              <p className="text-white text-xs font-semibold">
                Montgomery News Feed
              </p>
              {lastFetched && (
                <p className="text-slate-500 text-xs">
                  Updated {lastFetched}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadNews}
                disabled={loading}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw
                  size={13}
                  className={loading ? 'animate-spin text-blue-400' : ''}
                />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* News Items */}
          <div
            className="max-h-96 overflow-y-auto divide-y divide-slate-700/50"
            style={{ scrollbarColor: '#3b82f6 #1e293b' }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8 gap-2">
                <RefreshCw size={14} className="animate-spin text-blue-400" />
                <span className="text-slate-400 text-xs">
                  Fetching live news...
                </span>
              </div>
            ) : error ? (
              <div className="text-center py-6 text-slate-400 text-xs px-4">
                Could not load live news. Using cached stories.
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No news found.
              </div>
            ) : (
              news.map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-4 py-3
                             hover:bg-slate-700/50 transition-all duration-200 block"
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                                ${DOT_MAP[item.color]}`}
                  >
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-xs leading-snug mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded border
                                   ${COLOR_MAP[item.color]}`}
                      >
                        {item.category}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {item.time}
                      </span>
                      {item.url !== '#' && (
                        <ExternalLink
                          size={10}
                          className="text-slate-500 ml-auto"
                        />
                      )}
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-slate-700 bg-slate-900/50">
            <p className="text-slate-600 text-xs text-center">
              Powered by{' '}
              <span className="text-blue-500">Bright Data</span>
              {' '}· AL.com Montgomery
            </p>
          </div>

        </div>
      )}
    </div>
  )
}