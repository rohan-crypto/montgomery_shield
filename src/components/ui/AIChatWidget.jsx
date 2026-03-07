import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../../api/aiChat'
import { Bot, X, Send, Shield, Loader2 } from 'lucide-react'

const SUGGESTED_QUESTIONS = [
  "Which district has the most violations?",
  "What is the average fire response time?",
  "How does staffing affect public safety?",
  "What is the Meta investment impact?",
]

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm the Montgomery Shield Assistant. I have access to live public safety data for Montgomery, AL. Ask me anything about crime trends, fire response times, neighbourhood health, or economic impact. How can I help?",
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function handleSend(text) {
    const userMessage = text || input.trim()
    if (!userMessage || loading) return

    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const reply = await sendMessage(newMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: err.message.includes('429')
          ? "I'm receiving too many requests right now. Please wait a moment and try again."
          : "Sorry, I couldn't connect right now. Please try again in a moment."
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-6 md:right-8 z-[10000] flex flex-col items-end gap-2 isolate">

      {/* Chat Panel */}
      {open && (
        <div
          className="bg-slate-800 border border-slate-700 rounded-xl
                     shadow-2xl flex flex-col overflow-hidden isolate"
          style={{
            width: 'min(320px, calc(100vw - 32px))',
            height: 'min(480px, calc(100vh - 120px))',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3
                          bg-gradient-to-r from-blue-900/50 to-slate-800
                          border-b border-slate-700">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center
                            justify-center flex-shrink-0">
              <Shield size={16} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">
                Montgomery Shield Assistant
              </p>
              <p className="text-slate-400 text-xs">
                Powered by Groq · Llama 3.1
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ scrollbarColor: '#3b82f6 #1e293b' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center
                                  justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Shield size={12} className="text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-700 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center
                                justify-center flex-shrink-0 mr-2 mt-0.5">
                  <Shield size={12} className="text-blue-400" />
                </div>
                <div className="bg-slate-700 rounded-xl rounded-bl-none px-3 py-2">
                  <Loader2 size={14} className="animate-spin text-blue-400" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300
                             px-2 py-1 rounded-lg transition-all duration-200
                             border border-slate-600 hover:border-blue-500/50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Montgomery..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg
                         px-3 py-2 text-xs text-white placeholder-slate-500
                         focus:outline-none focus:border-blue-500
                         transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600
                         rounded-lg flex items-center justify-center
                         transition-all duration-200 flex-shrink-0"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center
                    transition-all duration-300 ${
                      open
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-blue-600 hover:bg-blue-500'
                    }`}
      >
        {open
          ? <X size={20} className="text-white" />
          : <Bot size={20} className="md:hidden text-white" />
        }
        {!open && <Bot size={24} className="hidden md:block text-white" />}
      </button>
    </div>
  )
}