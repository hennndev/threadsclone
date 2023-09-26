import React from 'react'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import UsersList from '@/components/search/usersList'
import SearchInput from '@/components/search/searchInput'
import { getUsers, fetchUser } from '@/lib/actions/user.actions'

export function metadata() {
  return {
    title: "Search"
  }
}
const SearchPage = async ({searchParams}: {searchParams: {[key: string]: string }}) => {
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) {
    notFound()
  }
  const user: UserInfoTypes | null = await fetchUser(userLoggedIn.id)
  if(!user) {
    notFound()
  }
  const users: UserData[] = await getUsers(userLoggedIn.id, searchParams.query ? searchParams.query : "")
  return (
    <section className="w-full flex items-end lg:items-start justify-center p-5">
      <div className="w-[550px]">
        <div className="flex flex-col">
          <SearchInput/>
          <UsersList 
            users={users} 
            userLoggedInId={userLoggedIn.id}
            currentUserData={user}/>
        </div>
      </div>
    </section>
  )
}

export default SearchPage