import { getTodos } from '@/actions/todo'
import ButtonAddTodo from '@/components/button-add-todo'
import CardTodo from '@/components/card-todo'
import TodoNotFound from '@/components/todo-not-found'

export default async function HomePage() {
  const { data: activities } = await getTodos()

  return (
    <main className="mx-auto max-w-screen-lg px-8">
      <div className="flex flex-col items-center gap-2 py-11 sm:flex-row">
        <div className="flex-1 text-3xl font-bold">Activity</div>
        <ButtonAddTodo />
      </div>

      {!activities || activities.length === 0 ? (
        <TodoNotFound />
      ) : (
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activities.map((activity) => (
            <CardTodo
              key={activity.id}
              id={activity.id}
              title={activity.title}
              createdAt={activity.created_at}
            />
          ))}
        </div>
      )}
    </main>
  )
}
