import InputChangeTodoTitle from '@/components/detail/input-change-todo-title'
import ButtonAddTodoItem from '@/components/detail/button-add-todo-item'
import ButtonBack from '@/components/detail/button-back'
import ButtonSortTodoItem from '@/components/detail/button-sort-todo-item'
import CardTodoItem from '@/components/detail/card-todo-item'
import TodoItemNotFound from '@/components/detail/todo-item-not-found'
import { getTodoItems } from '@/actions/todo-item'
import { notFound } from 'next/navigation'

export default async function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data, serverError, validationErrors } = await getTodoItems({
    todoId: Number(id),
  })

  if (!data || !!serverError || !!validationErrors) notFound()

  return (
    <main className="mx-auto max-w-screen-lg px-8">
      <div className="flex flex-col justify-center gap-2 py-11 sm:flex-row sm:items-center">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <ButtonBack />
          <InputChangeTodoTitle todoId={data.id} title={data.title} />
          <ButtonSortTodoItem />
        </div>
        <ButtonAddTodoItem />
      </div>

      {!data.todo_items || data.todo_items.length === 0 ? (
        <TodoItemNotFound />
      ) : (
        <div className="flex flex-col gap-2">
          {data.todo_items.map((todoItem) => (
            <CardTodoItem
              key={todoItem.id}
              id={todoItem.id}
              isActive={Boolean(todoItem.is_active)}
              priority={todoItem.priority}
              title={todoItem.title}
            />
          ))}
        </div>
      )}
    </main>
  )
}
