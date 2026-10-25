import { useState, type FormEvent } from 'react'

const kinds = ['Professional enquiry', 'Live performance', 'Music & collaboration', 'Press'] as const
interface Values { name: string; email: string; kind: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = { state: 'idle' | 'sending' } | { state: 'success' | 'error'; message: string }

const validate = (v: Values): Errors => {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.kind) e.kind = 'Choose an enquiry type.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}

export default function ContactForm() {
  const [v, setV] = useState<Values>({ name: '', email: '', kind: kinds[0], message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const hp = (e.currentTarget.elements.namedItem('company') as HTMLInputElement | null)?.value
    if (hp) return // honeypot
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
    if (!endpoint) {
      setStatus({ state: 'error', message: 'This form isn’t connected to a mail service yet, so your message was not sent.' })
      return
    }
    setStatus({ state: 'sending' })
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ state: 'success', message: 'Message sent. Thank you — you’ll hear back soon.' })
      setV({ name: '', email: '', kind: kinds[0], message: '' })
    } catch {
      setStatus({ state: 'error', message: 'Your message couldn’t be sent. Check your connection and try again.' })
    }
  }

  const field = 'w-full border-0 border-b border-ink/30 bg-transparent py-3 text-ink placeholder:text-charcoal/40 focus:border-maroon focus:outline-none focus-visible:outline-none'
  const err = (k: keyof Values) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-maroon">{errors[k]}</p>
  const aria = (k: keyof Values) => ({ 'aria-invalid': Boolean(errors[k]), 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <div><label htmlFor="name" className="label">Name</label><input id="name" autoComplete="name" className={field} value={v.name} onChange={set('name')} {...aria('name')} />{err('name')}</div>
      <div><label htmlFor="email" className="label">Email</label><input id="email" type="email" autoComplete="email" className={field} value={v.email} onChange={set('email')} {...aria('email')} />{err('email')}</div>
      <div>
        <label htmlFor="kind" className="label">Enquiry type</label>
        <select id="kind" className={`${field} [&>option]:text-ink`} value={v.kind} onChange={set('kind')} {...aria('kind')}>
          {kinds.map((k) => <option key={k}>{k}</option>)}
        </select>{err('kind')}
      </div>
      <div><label htmlFor="message" className="label">Message</label><textarea id="message" rows={4} className={field} value={v.message} onChange={set('message')} {...aria('message')} />{err('message')}</div>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      <button type="submit" disabled={status.state === 'sending'} className="btn bg-ink text-ivory hover:bg-maroon disabled:opacity-60">
        {status.state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <div role="status" aria-live="polite">
        {(status.state === 'success' || status.state === 'error') && (
          <p className={status.state === 'success' ? 'font-medium text-ink' : 'text-maroon'}>{status.message}</p>
        )}
      </div>
    </form>
  )
}
