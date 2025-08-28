import { createFileRoute } from '@tanstack/react-router'

function Index() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Hotel Guest Management
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your hotel guests efficiently
      </p>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})