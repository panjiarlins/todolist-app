import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import DialogAddTodoItem from './dialog-add-todo-item'

export default function ButtonAddTodoItem() {
  return (
    <DialogAddTodoItem>
      <Button className="flex w-fit flex-row gap-1 rounded-[45px] p-7">
        <Plus />
        <span className="text-lg font-semibold">Tambah</span>
      </Button>
    </DialogAddTodoItem>
  )
}
