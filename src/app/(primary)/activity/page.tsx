import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import Activities from '@/components/activity/activities'
import ActivitiesHeader from '@/components/activity/activitiesHeader'
import { getUserActivities, readAllActivities } from '@/lib/actions/user.actions'

export const metadata = {
  title: "Activity"
}
const ActivityPage = async () => {
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const data = await getUserActivities(userLoggedIn.id)
  if(!data) {
    notFound()
  }
  await readAllActivities(userLoggedIn.id)
  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        {data.activities.length > 0 ? <ActivitiesHeader userLoggedInId={userLoggedIn.id}/> : null}
        {data.activities.length > 0 ? (
          <Activities activities={data.activities}/>
        ) : (
          <p className="text-primary-light dark:text-primary-dark text-sm text-center">Belum ada aktivitas</p>
        )}
      </div>
    </section>
  )
}
export default ActivityPage