import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/guests/"!</div>
}
