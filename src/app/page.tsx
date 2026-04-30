"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { GrainOverlay } from "@/components/GrainOverlay"
import { CustomCursor } from "@/components/CustomCursor"
import { PaperDesignShaderBackground } from "@/components/ui/paper-design-shader-background"
import { Sidebar } from "@/components/sections/Sidebar"
import { ProjectList } from "@/components/sections/ProjectList"
import { EmailModal } from "@/components/sections/EmailModal"

export default function Page() {
  const [emailOpen, setEmailOpen] = useState(false)
  const openEmail = useCallback(() => setEmailOpen(true), [])
  const closeEmail = useCallback(() => setEmailOpen(false), [])

  return (
    <>
      <PaperDesignShaderBackground paused={emailOpen} />
      <GrainOverlay />
      <CustomCursor flat={emailOpen} />

      <motion.div
        className="relative z-10 mx-auto min-h-screen max-w-[1040px] px-8 py-16"
        initial={{ filter: "blur(18px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <div className="flex gap-0">
          <div className="w-[240px] shrink-0">
            <Sidebar onEmailClick={openEmail} />
          </div>

          <div className="min-w-0 flex-1 border-l border-[rgba(30,26,22,0.12)] pl-16 md:pl-20">
            <section className="mb-16">
              <h2 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6a6050]">
                About
              </h2>
              <p className="max-w-[620px] text-[15px] leading-[1.6] tracking-[-0.011em] text-[#1e1a16]">
                studying computer science at the <strong>university of virginia</strong>. interested in{" "}
                <strong>full-stack architecture</strong>, ai, and simulation. currently available for work.
              </p>
            </section>

            <ProjectList />

            <footer className="mt-16 text-[11px] lowercase tracking-[-0.011em] text-[#a09880]">
              © {new Date().getFullYear()} tony lam
            </footer>
          </div>
        </div>
      </motion.div>

      <EmailModal open={emailOpen} onClose={closeEmail} />
    </>
  )
}
