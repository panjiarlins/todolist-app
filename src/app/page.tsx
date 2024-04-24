import ActivityCard from '@/components/activity-card'
import ActivityNotFound from '@/components/activity-not-found'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Home() {
  const activities = [
    { _id: '1', title: 'New Activity', createdAt: new Date().toISOString() },
    { _id: '2', title: 'New Activity2', createdAt: new Date().toISOString() },
    { _id: '3', title: 'New Activity3', createdAt: new Date().toISOString() },
    { _id: '4', title: 'New Activity4', createdAt: new Date().toISOString() },
  ]

  return (
    <main className="mx-auto max-w-screen-lg px-8">
      <div className="flex flex-col items-center gap-2 py-11 sm:flex-row">
        <div className="flex-1 text-4xl font-bold">Activity</div>
        <Button className="flex flex-row gap-1 rounded-[45px] px-7 py-7">
          <Plus />
          <span className="text-lg font-semibold">Tambah</span>
        </Button>
      </div>

      {activities.length === 0 ? (
        <ActivityNotFound />
      ) : (
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              id={activity._id}
              title={activity.title}
              createdAt={activity.createdAt}
            />
          ))}
        </div>
      )}
    </main>
  )
}
