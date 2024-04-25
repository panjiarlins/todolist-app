import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoaderCircle className="size-64 animate-spin text-primary" />
    </div>
  )
}
