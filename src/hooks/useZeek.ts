import { useState, useCallback } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

const VPS_CHAT_URL = 'https://neogents.io/api/chat'

// Stub responses for local dev
const STUB_RESPONSES: Record<string, string[]> = {
  students: [
    "That's exactly what we built this for. Let me show you the right starting template.",
    "Solid. The COMP 14-day sprint is probably your fastest path. Want me to walk you through it?",
    "Most students coming through here start with the freelance stack — AI + one skill = income. What's your strongest skill right now?",
  ],
  parents: [
    "That's a real challenge. The Family CFO system was built specifically for this — let me point you to the right module.",
    "Good question. Most families in that situation start with the benefits navigator first. Have you gone through that yet?",
    "I hear you. Let's map this out step by step. What's the most urgent piece — budget, savings, or planning for the kids?",
  ],
  solopreneur: [
    "Classic bottleneck. The missed call problem alone usually costs businesses 3-5 bookings a week. We can fix that this week.",
    "That's the right instinct. Let's audit your current workflow first — what does a typical day look like for you?",
    "Good. The 70-agent library has something for exactly this. What industry are you in?",
  ],
  creators: [
    "The algorithm isn't the problem — it's the output frequency. Trinity can solve that. What platform are you on?",
    "That's a hook problem. Let me show you the Hook Generator template — it's free and it works.",
    "I hear that all the time. The key is repurposing. One video can become 7 pieces of content. Want to see how?",
  ],
  general: [
    "Good question. Which describes you best — student, parent, solopreneur, or creator? I'll point you to the right track.",
    "We've got tools for all of that. Tell me more about what's actually blocking you right now.",
    "Let's figure out the right starting point. What's the one thing you wish was handled automatically in your life or business?",
  ],
}

function getStubResponse(persona: string): string {
  const responses = STUB_RESPONSES[persona] || STUB_RESPONSES.general
  return responses[Math.floor(Math.random() * responses.length)]
}

export function useZeek(persona: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const send = useCallback(async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)
    setShowTemplates(false)

    try {
      const res = await fetch(VPS_CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona, message: userMessage, history: messages }),
        signal: AbortSignal.timeout(8000),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      if (data.show_templates) setShowTemplates(true)
    } catch {
      // Fallback to stub in dev / when VPS unreachable
      const reply = getStubResponse(persona)
      const idk = reply.toLowerCase().includes("i don't know") || reply.includes('not sure')
      setMessages([...newMessages, { role: 'assistant', content: reply }])
      if (idk) setShowTemplates(true)
    } finally {
      setLoading(false)
    }
  }, [messages, persona])

  const reset = useCallback(() => {
    setMessages([])
    setShowTemplates(false)
  }, [])

  return { messages, loading, showTemplates, send, reset }
}
