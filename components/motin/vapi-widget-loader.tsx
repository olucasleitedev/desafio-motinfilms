"use client"

import dynamic from "next/dynamic"

const VapiWidget = dynamic(
  () => import("./vapi-widget").then(m => ({ default: m.VapiWidget })),
  { ssr: false }
)

export function VapiWidgetLoader() {
  return <VapiWidget />
}
