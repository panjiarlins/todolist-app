'use client'

import { deleteTodo } from '@/actions/todo'
import { Button } from './ui/button'
import { Trash2, TriangleAlert } from 'lucide-react'
import { Dialog, DialogClose, DialogPortal, DialogTrigger } from './ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'

export default function ButtonDeleteTodo({
  id,
  title,
  setIsDeleteButtonClicked,
}: {
  id: number
  title: string
  setIsDeleteButtonClicked: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { execute, status } = useAction(deleteTodo, {
    onExecute: () => {
      toast.loading('Deleting activity', { id, duration: Infinity })
    },
    onError: () => {
      toast.error('Failed to delete activity', { id, duration: 3000 })
    },
    onSuccess: () => {
      toast.success('Activity is deleted successfully', { id, duration: 3000 })
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsDeleteButtonClicked(true)
          }}
          variant="outline"
          size="icon"
          className="rounded-full border-none"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogPrimitive.Content
          onClick={() => {
            setIsDeleteButtonClicked(true)
          }}
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-12 overflow-auto rounded-2xl border bg-background p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        >
          <div className="flex flex-row items-center justify-center">
            <TriangleAlert className="size-16 text-destructive" />
          </div>

          <div className="flex flex-col items-center justify-center text-lg font-medium">
            <div>Apakah anda yakin menghapus activity</div>
            <div>
              <span className="font-bold">&quot;{title}&quot;</span> ?
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-4">
            <DialogClose asChild>
              <Button
                disabled={status === 'executing'}
                variant="secondary"
                className="rounded-[45px] px-8 py-6 text-lg font-semibold"
              >
                Batal
              </Button>
            </DialogClose>
            <Button
              disabled={status === 'executing'}
              onClick={() => {
                execute({ id })
              }}
              variant="destructive"
              className="rounded-[45px] px-8 py-6 text-lg font-semibold"
            >
              Hapus
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
