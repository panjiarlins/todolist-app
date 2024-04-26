'use client'

import { addTodo } from '@/actions/todo'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

export default function ButtonAddTodo() {
  return (
    <Button
      onClick={async () => {
        await addTodo({
          title: 'New Activity',
          email: process.env.NEXT_PUBLIC_EMAIL ?? '',
        })
      }}
      className="flex flex-row gap-1 rounded-[45px] p-7"
    >
      <Plus />
      <span className="text-lg font-semibold">Tambah</span>
    </Button>
  )
}
