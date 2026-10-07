import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sheet({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-white/10 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-50 flex h-full w-[85vw] max-w-sm flex-col border-l border-white/10 bg-[#090C0A] p-7 shadow-2xl"
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-6 top-6 p-2 rounded-full text-white hover:text-white transition-colors"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mt-8 flex flex-col h-full">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
