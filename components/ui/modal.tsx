'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "full"
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className,
}: ModalProps) {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Configure sizes
  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    full: "max-w-[95vw] h-[95vh]",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-void/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative w-full overflow-hidden bg-obsidian border border-white/10 shadow-2xl pointer-events-auto",
                sizes[size],
                className
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                {title && <h2 className="text-xl font-display font-medium text-white">{title}</h2>}
                <button
                  onClick={onClose}
                  className="ml-auto flex shrink-0 items-center justify-center h-8 w-8 rounded-full text-text-secondary hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>
              <div className={cn("p-6 overflow-y-auto", size === "full" ? "h-[calc(100%-73px)]" : "max-h-[80vh]")}>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
