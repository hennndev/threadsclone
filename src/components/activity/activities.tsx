import React from 'react'
import moment from 'moment'
import Link from 'next/link'

type PropsTypes = {
  activities: any
}

const Activities = ({activities}: PropsTypes) => {
  

  return (
    <section className="flex flex-col">
      {activities.map((activity: any) => {

        let title: string
        switch(activity.type) {
          case "following":
            title = "New follower :"
            break
          case "comment":
            title = "New comment :"
            break
          default:
            title = "From developer :"
        }

        return (
          <div className="flex flex-col pb-4 border-b border-gray-200 dark:border-gray-700 mb-4" key={activity._id}>
            <div className="flex-between">
              <h3 className="font-semibold mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mr-3">{moment(activity.createdAt).startOf('minutes').fromNow()}</p>
            </div>
            {activity.type === "comment" ? (
              <Link href={activity.routeLink} className="text-sm font-semibold">
                @{activity.username} <span className="font-normal text-gray-700 dark:text-gray-200">berkomentar di thread kamu: {`"${activity.text}"`}</span>
              </Link>
            ) : null}
            {activity.type === "following" ? (
              <p className="text-sm font-semibold">@{activity.username} <span className="font-normal text-gray-700 dark:text-gray-200">{activity.text}</span></p>
            ) : null}
            {activity.type === "greeting" ? (
              <p className="text-sm">{activity.text}</p>
            ) : null}
          </div>
          )  
      })}
    </section>
  )
}

export default Activities