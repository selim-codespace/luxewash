'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const quickActions = [
  "Book a detail",
  "Get a quote",
  "Ceramic coating info",
  "Membership plans"
]

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm LuxeBot, your AI concierge. I can help you book a service, answer questions about our detailing packages, or recommend the perfect treatment for your vehicle. How can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    let responseContent = ""
    
    if (messageText.toLowerCase().includes('book')) {
      responseContent = "I'd be happy to help you book a service! Our most popular package is the Signature Detail at $199, which includes a full interior and exterior detail. Would you like me to start a booking for you?"
    } else if (messageText.toLowerCase().includes('price') || messageText.toLowerCase().includes('cost') || messageText.toLowerCase().includes('quote')) {
      responseContent = "Our services start at $79 for an Express Exterior detail, going up to $799 for our Ultimate Correction package with ceramic coating. Vehicle size (SUV/Truck) may affect pricing. Would you like a custom quote?"
    } else if (messageText.toLowerCase().includes('ceramic')) {
      responseContent = "Our ceramic coating packages provide 2-5 years of protection! We offer Basic ($299), Premium ($499), and Ultimate ($799) options. The coating repels water, resists scratches, and keeps your car looking showroom-new. Which tier interests you?"
    } else if (messageText.toLowerCase().includes('member') || messageText.toLowerCase().includes('subscription')) {
      responseContent = "Our membership plans give you priority booking, discounted add-ons, and locked-in rates! Plans start at $79/month (Bronze) up to $249/month (Gold) for unlimited Express washes. Would you like details on any tier?"
    } else {
      responseContent = "Thank you for your question! I can help with booking, pricing, service recommendations, and more. You can also call us at 1-800-LUXE-WASH for immediate assistance. What else would you like to know?"
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center text-white hover:shadow-primary/50 transition-all"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-void animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-8 z-50 w-80 md:w-96 bg-obsidian border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">LuxeBot</h3>
                  <p className="text-white/70 text-xs">AI Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.role === 'user'
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white/5 text-text-primary rounded-bl-md"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-2">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}