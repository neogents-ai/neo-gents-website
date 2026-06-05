import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useZeek } from '../hooks/useZeek'

interface Props {
  persona: string
  opener: string
  accentColor?: string
}

export default function ZeekChat({ persona, opener, accentColor = '#D4A017' }: Props) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, showTemplates, send } = useZeek(persona)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    send(input.trim())
    setInput('')
  }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] flex flex-col"
            style={{
              background: 'rgba(13, 13, 13, 0.97)',
              border: `1px solid ${accentColor}25`,
              boxShadow: `0 0 40px rgba(0,0,0,0.6), 0 0 20px ${accentColor}10`,
              backdropFilter: 'blur(20px)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: `${accentColor}20` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 flex items-center justify-center text-xs font-display font-700"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
                >
                  Z
                </div>
                <div>
                  <p className="font-display font-700 text-xs text-light tracking-wider">ZEEK</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-green animate-pulse" />
                    <span className="font-mono text-xs" style={{ color: accentColor, fontSize: '9px', opacity: 0.7 }}>
                      {persona.toUpperCase()} · ONLINE
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-light transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: '200px', maxHeight: '340px' }}>
              {/* Opener */}
              <div className="flex gap-2">
                <div
                  className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-display font-700"
                  style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontSize: '9px' }}
                >
                  Z
                </div>
                <div
                  className="text-xs font-body leading-relaxed text-light/80 px-3 py-2"
                  style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}15` }}
                >
                  {opener}
                </div>
              </div>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-display font-700"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontSize: '9px' }}
                    >
                      Z
                    </div>
                  )}
                  <div
                    className="text-xs font-body leading-relaxed px-3 py-2 max-w-[80%]"
                    style={
                      msg.role === 'user'
                        ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E2E2E2' }
                        : { background: `${accentColor}08`, border: `1px solid ${accentColor}15`, color: 'rgba(204,204,204,0.85)' }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-2">
                  <div
                    className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-display font-700"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontSize: '9px' }}
                  >
                    Z
                  </div>
                  <div className="px-3 py-2" style={{ border: `1px solid ${accentColor}15`, background: `${accentColor}08` }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Template prompt */}
              {showTemplates && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-body px-3 py-2 text-center"
                  style={{ border: `1px dashed ${accentColor}30`, color: `${accentColor}`, background: `${accentColor}05` }}
                >
                  Let me show you a template that might help. Scroll up to the gallery ↑
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 pb-3 pt-2 border-t flex gap-2"
              style={{ borderColor: `${accentColor}15` }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask Zeek anything..."
                disabled={loading}
                className="flex-1 bg-transparent font-body text-xs text-light placeholder-muted/50 outline-none px-2 py-2 border"
                style={{ borderColor: `${accentColor}20` }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 py-2 font-mono text-xs transition-all disabled:opacity-30"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex flex-col items-center justify-center gap-0.5 transition-all duration-200"
        style={{
          backgroundColor: open ? 'rgba(22,26,32,0.95)' : accentColor,
          border: `1px solid ${open ? accentColor + '40' : 'transparent'}`,
          boxShadow: open ? `0 0 20px ${accentColor}30` : `0 4px 24px ${accentColor}50`,
        }}
        title={open ? 'Close Zeek' : 'Ask Zeek'}
      >
        {open ? (
          <span className="text-lg" style={{ color: accentColor }}>×</span>
        ) : (
          <>
            <span className="font-display font-800 text-sm text-black leading-none">Z</span>
            <span className="font-mono text-black leading-none" style={{ fontSize: '8px', opacity: 0.7 }}>ZEEK</span>
          </>
        )}

        {/* Pulse ring */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{ border: `1px solid ${accentColor}`, borderRadius: 0 }}
          />
        )}
      </motion.button>
    </>
  )
}
