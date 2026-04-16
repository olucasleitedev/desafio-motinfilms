"use client"

import { createElement, type ReactNode } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "article" | "header" | "li"
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return createElement(
    as,
    {
      ref,
      className: cn("reveal", className),
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  )
}
