import { useState, useCallback } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

const VPS_CHAT_URL = 'https://neogents.io/api/chat'

// Stub responses — mirrors Zeek VPS personas (used when VPS unreachable)
const STUB_RESPONSES: Record<string, string[]> = {
  students: [
    "M.A.K.I. here. The COMP 14-day sprint is the fastest path from zero to income — what's your strongest skill right now?",
    "Solid move. Most students here start with the freelance stack — AI plus one skill equals real money. Let me show you a template.",
    "That's the right question. Tell me what you're trying to build and I'll map the shortest route.",
  ],
  parents: [
    "M.A.C. here — Chief Family Officer. The Family CFO system was built for exactly this. What's the most urgent piece right now — budget, savings, or planning for the kids?",
    "Good question. Most families start with the benefits navigator first — it finds money you're already owed. Have you gone through that yet?",
    "Plain English, no jargon — that's how we work here. Walk me through what's happening and I'll break it down.",
  ],
  solopreneur: [
    "N.O.R.I. here. The missed call problem alone costs most businesses 3–5 bookings a week. What's eating the most time right now?",
    "The 70-agent library has something for exactly this. What industry are you in — I'll match the right agent.",
    "Let's audit the workflow first. What does a typical day look like and where does it break down?",
  ],
  creators: [
    "Marketing Specialist here. The algorithm isn't the problem — it's output frequency. What platform are you trying to grow and how often are you posting?",
    "That's a hook problem. I have a template built for this — want to see it?",
    "One piece of content can become 7. Let me show you how the repurpose pipeline works.",
  ],
  sfs: [
    "Welcome to the Soulfood Sushi family. Whether it's your kid leveling up or your household budget — tell me who we're building this future for.",
    "The daily quest loop is where most families start — four pillars a day, real skills, no debt at the end. Want the tour?",
    "Parents get the weekly Life Audit, kids get the game. Which side of the table are you on today?",
  ],
  nori: [
    "N.O.R.I. here. The missed call problem alone costs most businesses 3–5 bookings a week. What's eating the most time right now?",
    "The agent library has something for exactly this. What industry are you in — I'll match the right agent.",
    "Creator or operator, same answer: automate the repeat work. What does a typical day look like and where does it break down?",
  ],
  general: [
    "Which describes you best — a family with kids to launch, or a business/creator ready to automate? I'll route you to the right track.",
    "We've got tools for all of that. What's the one thing you wish was handled automatically right now?",
    "Tell me what's actually blocking you and I'll point you to the right starting point.",
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
