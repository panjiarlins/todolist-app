'use client'

import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function ButtonBack() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.back()
      }}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <ChevronLeft className="size-8" />
    </Button>
  )
}
