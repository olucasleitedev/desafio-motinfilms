import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionHeadingProps {
  kicker: string
  title: ReactNode
  subtitle?: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 max-w-4xl",
        align === "center" && "mx-auto text-center items-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-10 bg-[var(--gold)]" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
          {kicker}
        </span>
        <span className="h-px w-10 bg-[var(--gold)]" />
      </div>

      <h2 className="display text-ivory text-balance text-4xl md:text-6xl lg:text-7xl">
        {title}
      </h2>

      {subtitle && (
        <p className="text-ivory/60 text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
