"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"

export function UvaBadge() {
  return (
    <motion.div
      className="fixed right-4 top-4 z-50"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -2, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Badge
          variant="outline"
          className="relative overflow-hidden border-white/20 bg-white/60 px-3 py-1 text-[10px] font-medium tracking-wide backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-900/40"
        >
          <span className="relative z-10">
            CHARLOTTESVILLE / UVA CS &apos;29
          </span>

          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </Badge>
      </motion.div>
    </motion.div>
  )
}

