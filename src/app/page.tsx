import { getTodos } from '@/actions/todo'
import ActivityCard from '@/components/activity-card'
import ActivityNotFound from '@/components/activity-not-found'
import AddTodoButton from '@/components/add-todo-button'

export default async function Home() {
  const { data: activities } = await getTodos()

  return (
    <main className="mx-auto max-w-screen-lg px-8">
      <div className="flex flex-col items-center gap-2 py-11 sm:flex-row">
        <div className="flex-1 text-4xl font-bold">Activity</div>
        <AddTodoButton />
      </div>

      {!activities || activities.length === 0 ? (
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
      )}
    </main>
  )
}
