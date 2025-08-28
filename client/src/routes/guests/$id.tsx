import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams, useRouter, Link } from '@tanstack/react-router'
import { deleteGuest, getGuest, updateGuest } from '../../services/pocketbase'
import { useEffect, useState } from 'react'


// Define the route for guest details page
export const Route = createFileRoute('/guests/$id')({
  component: GuestDetailPage,
})

function GuestDetailPage() {
  // Get the dynamic route parameter "id" from URL
  const { id } = useParams({ from: '/guests/$id' })
  const router = useRouter()

  // Fetch guest data from backend using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['guest', id],
    queryFn: () => getGuest(id),
  })

  // Local state to manage form input values
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
  })

  // Populate form when data is loaded
  useEffect(() => {
    if (data) {
      setForm({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        date_of_birth: data.date_of_birth ? data.date_of_birth.substring(0, 10) : '',
      })
    }
  }, [data])

  // Mutation to save updated guest data
  const save = useMutation({
    mutationFn: () => updateGuest(id, form),
    onSuccess: () => router.navigate({ to: '/guests' }),
  })

  // Mutation to delete guest
  const del = useMutation({
    mutationFn: () => deleteGuest(id),
    onSuccess: () => router.navigate({ to: '/guests' }),
  })

  // Show loading or error messages
  if (isLoading) return <p>Loading…</p>
  if (isError || !data) return <p className="text-red-600">Failed to load guest.</p>

  return (
    <section className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Guest Details</h2>
        <Link to="/guests" className="px-3 py-1 rounded-xl border">Back</Link>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); save.mutate() }}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-2xl border"
      >
        <Input
          label="First Name"
          value={form.first_name}
          onChange={(v) => setForm(f => ({ ...f, first_name: v }))}
          required
        />
        <Input
          label="Last Name"
          value={form.last_name}
          onChange={(v) => setForm(f => ({ ...f, last_name: v }))}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm(f => ({ ...f, email: v }))}
          required
          className="col-span-2"
        />
        <Input
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm(f => ({ ...f, phone: v }))}
          className="col-span-2"
        />
        <Input
          label="Date of Birth"
          type="date"
          value={form.date_of_birth}
          onChange={(v) => setForm(f => ({ ...f, date_of_birth: v }))}
        />
        <Input
          label="Address"
          value={form.address}
          onChange={(v) => setForm(f => ({ ...f, address: v }))}
          className="col-span-2"
        />

        <div className="col-span-2 flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => del.mutate()}
            className="px-4 py-2 rounded-xl border text-red-600"
          >
            Delete
          </button>
          <button
            type="submit"
            disabled={save.isPending}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          >
            {save.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  )
}

// Custom Input component
function Input({
  label,
  className,
  value,
  onChange,
  required,
  type = 'text'
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  type?: string
  className?: string
}) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ''}`}>
      <span className="text-sm text-gray-600">
        {label}{required && ' *'}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-xl border px-3 py-2 outline-none focus:ring"
      />
    </label>
  )
}


