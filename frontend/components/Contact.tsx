'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <section id="contact" className="py-24 bg-[#14151a]">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2"
          />

          <textarea
            name="message"
            placeholder="Message"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full bg-bg border border-fg/30 rounded-md px-4 py-2 h-32"
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-accent hover:bg-indigo-500 px-4 py-3 rounded-md"
          >
            {status === 'sending'
              ? 'Sending…'
              : status === 'success'
              ? 'Sent! Thank you'
              : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-red-400 mt-2">Error sending message. Try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}
