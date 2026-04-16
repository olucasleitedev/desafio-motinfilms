import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = body?.message

    // Só processa relatório de fim de chamada
    if (message?.type !== 'end-of-call-report') {
      return NextResponse.json({ ok: true })
    }

    const call = message.call ?? {}
    const supabase = await createClient()

    await supabase.from('calls').insert({
      vapi_call_id:     call.id ?? `unknown-${Date.now()}`,
      transcript:       message.transcript ?? null,
      recording_url:    message.recordingUrl ?? null,
      duration_seconds: message.durationSeconds ?? null,
      summary:          message.summary ?? null,
      ended_reason:     message.endedReason ?? null,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[vapi/webhook] error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
