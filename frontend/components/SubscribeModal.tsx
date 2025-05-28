// components/SubscribeModal.tsx
'use client'
import { useState, useEffect } from 'react'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  useEffect(() => {
    // reset form/status whenever it opens
    if (isOpen) {
      setForm({ firstName: '', lastName: '', email: '' })
      setStatus('idle')
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#14151a] p-6 rounded-lg w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-fg">Subscribe</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-bg border border-fg/30 text-fg"
          />
          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-bg border border-fg/30 text-fg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-bg border border-fg/30 text-fg"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-accent text-bg px-4 py-2 rounded hover:bg-accent/90 transition"
          >
            {status === 'loading'
              ? 'Subscribing…'
              : status === 'success'
              ? 'Subscribed!'
              : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-red-500">Oops—please try again.</p>
        )}
        <button
          onClick={onClose}
          className="mt-2 text-sm text-fg/50 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
