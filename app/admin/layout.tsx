import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Motin Films',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#eeeae0] antialiased">
      {children}
    </div>
  )
}
