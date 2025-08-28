import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { createGuest } from '../../services/pocketbase'
import { useState } from 'react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

// Define the route for adding a new guest
export const Route = createFileRoute('/guests/new')({
  component: NewGuestPage,
})

function NewGuestPage() {
  const router = useRouter()

  // Form state to hold input values for the new guest
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
  })

  // Mutation to create a new guest
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => createGuest({ ...form }),
    onSuccess: () => router.navigate({ to: '/guests' }),
  })

  return (
    <section className="max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold">Add New Guest</h2>

      {error && <p className="text-red-600">{(error as Error).message}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutateAsync()
        }}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-2xl border"
      >
        <Input
          label="First Name"
          value={form.first_name}
          onValueChange={(v) => setForm(f => ({ ...f, first_name: v }))}
          required
        />
        <Input
          label="Last Name"
          value={form.last_name}
          onValueChange={(v) => setForm(f => ({ ...f, last_name: v }))}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onValueChange={(v) => setForm(f => ({ ...f, email: v }))}
          required
          className="col-span-2"
        />
        <Input
          label="Phone"
          type="tel"
          value={form.phone}
          onValueChange={(v) => setForm(f => ({ ...f, phone: v }))}
          className="col-span-2"
        />
        <Input
          label="Address"
          value={form.address}
          onValueChange={(v) => setForm(f => ({ ...f, address: v }))}
          className="col-span-2"
        />
        <Input
          label="Date of Birth"
          type="date"
          value={form.date_of_birth}
          onValueChange={(v) => setForm(f => ({ ...f, date_of_birth: v }))}
          className="col-span-2"
        />

        <div className="col-span-2 flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Add Guest'}
          </Button>
        </div>
      </form>
    </section>
  )
}
