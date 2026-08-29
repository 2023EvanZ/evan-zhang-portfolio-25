'use client'
import { useEffect, useState } from 'react'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

const fieldClass =
  'w-full border-0 border-b border-white/20 bg-transparent px-0 py-[10px] text-[17px] text-white outline-none transition-colors placeholder:text-fg/30 focus:border-accent'

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (isOpen) {
      setForm({ firstName: '', lastName: '', email: '' })
      setStatus('idle')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md border border-white/15 bg-bg-2 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="m-0 font-serif text-[30px] font-light leading-[1.1] text-white">
          Subscribe
        </h3>
        <p className="mt-3 text-[14px] leading-[1.7] text-fg/60">
          New posts, occasionally. No noise.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
            className={fieldClass}
          />
          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
            className={fieldClass}
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className={fieldClass}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="mt-2 justify-self-start bg-accent px-[34px] py-[15px] font-mono text-[12px] font-medium uppercase leading-none tracking-[.18em] text-bg transition-colors hover:bg-accent-bright disabled:opacity-60"
          >
            {status === 'loading'
              ? 'Subscribing…'
              : status === 'success'
                ? 'Subscribed'
                : 'Subscribe'}
          </button>
        </form>

        {status === 'error' && (
          <p className="mt-4 font-mono text-[12px] text-[#e4552f]">
            Something went wrong — please try again.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-6 font-mono text-[11px] uppercase tracking-[.18em] text-fg/40 transition-colors hover:text-fg"
        >
          Close
        </button>
      </div>
    </div>
  )
}
