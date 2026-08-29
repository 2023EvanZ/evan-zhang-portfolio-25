'use client'

import { useState } from 'react'
import { social } from './siteData'

const fieldClass =
  'w-full border-0 border-b border-white/20 bg-transparent px-0 py-[10px] text-[17px] text-white outline-none transition-colors placeholder:text-fg/25 focus:border-accent'

const labelClass =
  'font-mono text-[11px] uppercase leading-none tracking-[.18em] text-fg/50'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
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
    <section
      id="contact"
      className="border-t border-white/[.09] bg-bg-2 px-6 py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="mx-auto grid max-w-[1120px] items-start gap-12 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="m-0 font-serif text-[36px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[46px]">
            Say hello.
          </h2>
          <p className="mt-5 max-w-[380px] text-[15px] leading-[1.8] text-fg/[.66] text-pretty md:text-[16px]">
            Always happy to connect. Send a note and I&rsquo;ll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-[22px] font-mono text-[12px] uppercase leading-none tracking-[.14em] text-accent">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-accent/40 pb-1 transition-colors hover:border-accent hover:text-accent-bright"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2">
            <span className={labelClass}>Name</span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Message</span>
            <textarea
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={handleChange}
              className={`${fieldClass} resize-none`}
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className="mt-2 justify-self-start bg-accent px-[34px] py-[15px] font-mono text-[12px] font-medium uppercase leading-none tracking-[.18em] text-bg transition-colors hover:bg-accent-bright disabled:opacity-60"
          >
            {status === 'sending'
              ? 'Sending…'
              : status === 'success'
                ? 'Sent — thank you'
                : 'Send message'}
          </button>

          {status === 'error' && (
            <p className="font-mono text-[12px] text-[#e4552f]">
              Error sending message. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
