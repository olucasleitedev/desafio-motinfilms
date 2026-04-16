import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  necessidade: z.string().min(1, 'Necessidade obrigatória'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    const supabase = await createClient()
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
