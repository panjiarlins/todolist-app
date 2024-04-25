'use client'

import { SelectItem, SelectItemText } from '@radix-ui/react-select'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { priorities } from '@/utils/constant'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { addTodoItem } from '@/actions/todo-item'
import { useAction } from 'next-safe-action/hooks'

export default function DialogAddTodoItem({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const todoId = useMemo(() => Number(pathname.split('/').pop()), [pathname])

  const [newTodoItemData, setNewTodoItemData] = useState<{
    todoId: number
    title: string
    priority: 'very-low' | 'low' | 'normal' | 'high' | 'very-high'
  }>({ todoId, priority: 'very-low', title: '' })

  const { execute, status } = useAction(addTodoItem, {
    onSuccess: () => {
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Tambah List Item</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="todo-item-title"
              className="text-xs font-semibold uppercase"
            >
              Nama List Item
            </label>
            <input
              type="text"
              name="todo-item-title"
              id="todo-item-title"
              placeholder="Tambahkan nama list item"
              className="h-14 w-full rounded-md border-2 px-3 py-2 text-base font-normal"
              value={newTodoItemData.title}
              onChange={(e) => {
                setNewTodoItemData((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="todo-item-priority"
              className="text-xs font-semibold uppercase"
            >
              Priority
            </label>
            <Select
              value={newTodoItemData.priority}
              onValueChange={(v) => {
                setNewTodoItemData((prevState) => ({
                  ...prevState,
                  priority: v as
                    | 'very-low'
                    | 'low'
                    | 'normal'
                    | 'high'
                    | 'very-high',
                }))
              }}
            >
              <SelectTrigger
                name="todo-item-priority"
                id="todo-item-priority"
                className="h-14 w-full rounded-md border-2 px-3 py-2 text-base font-normal"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="">
                {priorities.map((priority) => (
                  <SelectItem
                    key={priority.value}
                    value={priority.value}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-base font-normal outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <SelectItemText>
                      <div className="flex flex-row items-center gap-4">
                        <div
                          className="size-4 rounded-full"
                          style={{ backgroundColor: priority.color }}
                        />
                        <div>{priority.name}</div>
                      </div>
                    </SelectItemText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={!newTodoItemData.title || status === 'executing'}
            onClick={() => {
              execute(newTodoItemData)
            }}
            className="rounded-[45px] px-8 py-6 text-lg font-semibold"
          >
            {status === 'executing' ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
