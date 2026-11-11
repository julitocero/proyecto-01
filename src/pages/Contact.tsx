import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useToast } from '../context/ToastContext'
import ConfirmDialog from '../components/ConfirmDialog'

type Field = 'name' | 'email' | 'message'
const initial = { name: '', email: '', message: '' }

function validate(form: typeof initial): Record<Field, string>{
  return {
    name: form.name.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Ingresa un email válido (debe contener @ y .)',
    message: form.message.trim().length < 10 ? 'El mensaje debe tener al menos 10 caracteres' : '',
  }
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const showToast = useToast()

  const errors = validate(form)
  const isValid = !errors.name && !errors.email && !errors.message

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setTouched((t) => ({ ...t, [name]: true }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isValid) setConfirmOpen(true)
  }

  const handleConfirm = () => {
    setConfirmOpen(false)
    setForm(initial);
    setTouched({ name: false, email: false, message: false })
    showToast('Mensaje enviado correctamente', 'success')
  }

  const inputClass = (field: Field) =>
    `mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
      touched[field] && errors[field] ? 'border-rose-500 focus:ring-rose-200' : 'border-stone-300 focus:ring-emerald-200'
    }`

  const errorText = (field: Field) =>
    touched[field] &&
    errors[field] && (
      <p id={`${field}-error`} className="mt-1 text-xs text-rose-600">
        {errors[field]}
      </p>
    )

  return (
    <section className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-800">Contacto</h1>
      <p className="text-sm text-stone-500">¿Tienes preguntas o sugerencias? Envíanos un mensaje.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-700">Nombre</label>
          <input id="name" name="name" value={form.name} onChange={handleChange}
            aria-invalid={touched.name && !!errors.name} aria-describedby="name-error" className={inputClass('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-stone-700">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            aria-invalid={touched.email && !!errors.email} aria-describedby="email-error" className={inputClass('email')} />
          {errorText('email')}
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-stone-700">Mensaje</label>
          <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..." aria-invalid={touched.message && !!errors.message}
            aria-describedby="message-error" className={inputClass('message')} />
          {errorText('message')}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enviar mensaje
        </button>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Enviar mensaje?"
        confirmLabel="Enviar"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      >
        Se enviará tu mensaje a nombre de <strong>{form.name}</strong>.
      </ConfirmDialog>
    </section>
  )
}
