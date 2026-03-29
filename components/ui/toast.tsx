'use client'

import { create } from 'zustand'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString(36).substring(2, 9) }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-4 p-6 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    if (toast.duration !== Infinity) {
      const timer = setTimeout(onRemove, toast.duration || 5000)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onRemove])

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-red-400" size={20} />,
    warning: <AlertTriangle className="text-gold" size={20} />,
    info: <Info className="text-blue-400" size={20} />,
  }

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-500/5',
    error: 'border-red-500/30 bg-red-500/5',
    warning: 'border-gold/30 bg-gold/5',
    info: 'border-blue-500/30 bg-blue-500/5',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        'relative flex items-start gap-3 w-full p-4 bg-obsidian backdrop-blur-xl border pointer-events-auto',
        borders[toast.type]
      )}
    >
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 pr-6">
        <h4 className="text-sm font-medium text-white">{toast.title}</h4>
        {toast.description && (
          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 text-text-tertiary hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
      
      {/* Progress bar */}
      {toast.duration !== Infinity && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-current opacity-20"
        />
      )}
    </motion.div>
  )
}

// Global helper that can be imported to trigger toasts from anywhere
export const toast = (props: Omit<Toast, 'id'>) => useToast.getState().addToast(props)
