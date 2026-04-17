import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = body?.message

    if (message?.type !== 'end-of-call-report') {
      return NextResponse.json({ ok: true })
    }

    const call     = message.call     ?? {}
    const artifact = message.artifact ?? {}
    const analysis = message.analysis ?? {}

    const vapiCallId = call.id
    if (!vapiCallId) {
      console.warn('[vapi/webhook] payload sem call.id, ignorando')
      return NextResponse.json({ ok: true })
    }

    const supabase = await createClient()

    const { data: existing } = await supabase
      .from('calls')
      .select('id')
      .eq('vapi_call_id', vapiCallId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: true, skipped: 'duplicate' })
    }

    const { error } = await supabase.from('calls').insert({
      vapi_call_id:     vapiCallId,
      transcript:       artifact.transcript       ?? message.transcript       ?? null,
      recording_url:    artifact.recordingUrl     ?? message.recordingUrl     ?? null,
      duration_seconds: message.durationSeconds   ?? call.duration            ?? null,
      summary:          analysis.summary          ?? message.summary          ?? null,
      ended_reason:     message.endedReason       ?? call.endedReason         ?? null,
    })

    if (error) {
      console.error('[vapi/webhook] Supabase error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('[vapi/webhook] chamada salva:', vapiCallId)
    return NextResponse.json({ ok: true }, { status: 201 })

  } catch (err) {
    console.error('[vapi/webhook] erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
