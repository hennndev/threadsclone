import React from 'react'
import moment from 'moment'

type PropsTypes = {
  activities: any
}

const Activities = ({activities}: PropsTypes) => {

  return (
    <section className="flex flex-col">
      {activities.map((activity: any) => (
        <div className="flex flex-col pb-4 border-b border-gray-200 dark:border-gray-700 mb-4" key={activity._id}>
          <div className="flex-between">
            <h3 className="font-semibold mb-1">Greeting</h3>
            <p className="text-sm text-gray-500 mr-3">{moment(activity.createdAt).startOf('minutes').fromNow()}</p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{activity.text}</p>
        </div>
      ))}
    </section>
  )
}

export default Activities