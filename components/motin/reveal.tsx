"use client"

import type React from "react"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "article" | "header" | "li"
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const Tag = as as unknown as React.ElementType
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
