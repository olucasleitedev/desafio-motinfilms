'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Film } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('E-mail ou senha inválidos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  const inputCls =
    'w-full bg-transparent border border-white/15 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-[#d4b46a] focus:outline-none transition-colors text-sm'

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <Film className="h-5 w-5 text-[#d4b46a]" strokeWidth={1.2} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4b46a]">
            Motin Films
          </span>
        </div>

        <h1 className="text-3xl font-light text-[#eeeae0] mb-2">
          Painel Admin
        </h1>
        <p className="text-[#eeeae0]/40 text-sm mb-10">
          Acesso restrito à equipe Motin Films
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/50">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@motinfilms.com.br"
              required
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/50">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={inputCls}
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 bg-[#d4b46a] text-[#08080a] px-6 py-3 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#c9a84c] transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
