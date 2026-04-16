import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

function getPublicSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url?.trim() || !anonKey?.trim()) return null
  return createClient(url, anonKey)
}

const leadSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  necessidade: z.string().min(1, 'Necessidade obrigatória'),
})

export async function POST(request: Request) {
  try {
    const supabase = getPublicSupabase()
    if (!supabase) {
      console.error('[leads] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
      return NextResponse.json({ error: 'Serviço indisponível' }, { status: 503 })
    }

    const body = await request.json()
    const data = leadSchema.parse(body)

    const { error } = await supabase.from('leads').insert(data)

    if (error) {
      console.error('[leads] Supabase error:', error.message)
      return NextResponse.json(
        { error: 'Erro ao salvar. Tente novamente.' },
        { status: 500 }
      )
    }

    console.log('GTM Event: Lead Generated', { email: data.email, necessidade: data.necessidade })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: err.flatten().fieldErrors },
        { status: 400 }
      )
    }
    console.error('[leads] Unexpected error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
