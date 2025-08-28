import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { listGuests } from '../../services/pocketbase'

// Define route for the Guests list page
export const Route = createFileRoute('/guests/')({
    component: GuestsPage,
})


function GuestsPage() {
    // State for search query input
    const [q, setQ] = useState('')

    // Fetch guests from backend using React Query
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['guests', q],
        queryFn: () => listGuests(q),
    })


    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by name, email, or phone"
                    className="w-full rounded-xl border px-4 py-2 outline-none focus:ring"
                />
                <button onClick={() => refetch()} className="rounded-xl border px-4 py-2 bg-white">Search</button>
                <Link to="/guests/new" className="rounded-xl bg-black text-white px-4 py-2">+ Add</Link>
            </div>


            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-600">Failed to load guests.</p>}


            <div className="overflow-hidden rounded-2xl border bg-white">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Phone</th>
                            <th className="text-left p-3">DOB</th>
                            <th className="text-right p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((g) => (
                        <tr key={g.id} className="border-t">
                            <td className="p-3">{g.first_name} {g.last_name}</td>
                            <td className="p-3">{g.email}</td>
                            <td className="p-3">{g.phone ?? '-'}</td>
                            <td className="p-3">{g.date_of_birth ? new Date(g.date_of_birth).toLocaleDateString() : '-'}</td>
                            <td className="p-3 text-right">
                            <Link to="/guests/$id" params={{ id: g.id }} className="rounded-lg border px-3 py-1">View</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
)
}