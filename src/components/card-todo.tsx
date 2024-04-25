'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ButtonDeleteTodo from './button-delete-todo'

export default function CardTodo({
  id,
  title,
  createdAt,
}: {
  id: number
  title: string
  createdAt: string
}) {
  const router = useRouter()
  const [, setIsDeleteButtonClicked] = useState(false)

  return (
    <div
      onClick={() => {
        setIsDeleteButtonClicked((prevState) => {
          if (!prevState) router.push(`/detail/${id}`)
          return false
        })
      }}
      className="flex aspect-square cursor-pointer flex-col justify-between rounded-xl bg-background p-6 shadow-md"
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="flex flex-row items-center text-muted-foreground">
        <span className="flex-1 text-sm font-medium">
          {new Date(createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <ButtonDeleteTodo
          id={id}
          title={title}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
      </div>
    </div>
  )
}
