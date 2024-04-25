'use client'

import { addTodo } from '@/actions/todo'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

export default function AddTodoButton() {
  return (
    <Button
      onClick={async () => {
        const result = await addTodo({
          title: 'New Activity',
          email: process.env.NEXT_PUBLIC_EMAIL ?? '',
        })
        console.log(1, result)
      }}
      className="flex flex-row gap-1 rounded-[45px] px-7 py-7"
    >
      <Plus />
      <span className="text-lg font-semibold">Tambah</span>
    </Button>
  )
}
