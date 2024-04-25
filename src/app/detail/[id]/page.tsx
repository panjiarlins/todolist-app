import InputChangeTodoTitle from '@/components/detail/input-change-todo-title'
import ButtonAddTodoItem from '@/components/detail/button-add-todo-item'
import ButtonBack from '@/components/detail/button-back'
import ButtonSortTodoItem from '@/components/detail/button-sort-todo-item'
import CardTodoItem from '@/components/detail/card-todo-item'
import TodoItemNotFound from '@/components/detail/todo-item-not-found'

export default function DetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const todoItems: Array<{
    activity_group_id: number
    id: number
    is_active: number
    priority: 'very-low' | 'low' | 'normal' | 'high' | 'very-high'
    title: string
  }> = []

  return (
    <main className="mx-auto max-w-screen-lg px-8">
      <div className="flex flex-col justify-center gap-2 py-11 sm:flex-row sm:items-center">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <ButtonBack />
          <InputChangeTodoTitle />
          <ButtonSortTodoItem />
        </div>
        <ButtonAddTodoItem />
      </div>

      {!todoItems || todoItems.length === 0 ? (
        <TodoItemNotFound />
      ) : (
        <div className="flex flex-col gap-2">
          {todoItems.map((todoItem) => (
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

      {/* {!activities || activities.length === 0 ? (
        <ActivityNotFound />
      ) : (
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              title={activity.title}
              createdAt={activity.created_at}
            />
          ))}
        </div>
      )} */}
    </main>
  )
}
