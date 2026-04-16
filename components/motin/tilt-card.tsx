"use client"

import type React from "react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  max?: number
  glare?: boolean
}

export function TiltCard({ children, className, max = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const rx = (py - 0.5) * -max * 2
    const ry = (px - 0.5) * max * 2
    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      transition: "transform 0.08s linear",
    })
    setGlarePos({ x: px * 100, y: py * 100 })
  }

  function handleLeave() {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={cn("relative will-change-transform", className)}
    >
      <div className="preserve-3d h-full w-full">{children}</div>
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${glarePos.x}% ${glarePos.y}%, rgba(212,180,106,0.14), transparent 40%)`,
            opacity: style.transform?.toString().includes("0deg") ? 0 : 1,
          }}
        />
      )}
    </div>
  )
}
