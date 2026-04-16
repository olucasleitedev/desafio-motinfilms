'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface ChartData {
  date: string
  leads: number
}

interface TooltipPayload {
  value: number
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="border border-[#d4b46a]/30 bg-[#0d0d10] px-3 py-2 text-xs">
      <p className="text-[#eeeae0]/50 mb-1">{label}</p>
      <p className="text-[#d4b46a] font-medium">
        {payload[0].value} {payload[0].value === 1 ? 'lead' : 'leads'}
      </p>
    </div>
  )
}

export function LeadsChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: 'rgba(238,234,224,0.35)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: 'rgba(238,234,224,0.35)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212,180,106,0.06)' }} />
        <Bar dataKey="leads" fill="#d4b46a" radius={[2, 2, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}
