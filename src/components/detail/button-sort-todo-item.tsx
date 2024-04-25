import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'

export default function ButtonSortTodoItem() {
  return (
    <Button variant="outline" className="aspect-square rounded-full py-7">
      <ArrowUpDown className="size-8" />
    </Button>
  )
}
