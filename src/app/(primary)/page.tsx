import { currentUser } from '@clerk/nextjs'
import Threads from '@/components/threads/threads'
import { fetchUser } from '@/lib/actions/user.actions'
import { getThreads } from '@/lib/actions/threads.actions'
import CreateThread from '@/components/threads/createThread'

export const metadata = {
  title: "Beranda"
}

const Home = async () => {
  const userLoggedIn = await currentUser()
  const threads: ThreadsTypes[] = await getThreads()
  if(!userLoggedIn) return null
  const user: UserInfoTypes | null = await fetchUser(userLoggedIn.id)
  
  let userData = {
    id: user?.id || userLoggedIn.id,
    name: user?.name || userLoggedIn.firstName,
    username: user?.username || userLoggedIn.username,
    image: user?.image || userLoggedIn.imageUrl,
    onboarded: user?.onboarded || false
  }

  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <CreateThread user={userData as UserInfoTypes}/>
        {threads.length > 0 ? (
          <Threads 
            data={threads} //threads data
            userLoggedInId={userLoggedIn.id.toString()} //id user login
            currentUserData={userData as UserInfoTypes}/> //user data login dari database
        ) : (
          <div className="flex-center">
            <p className="text-sm">Belum ada thread yang dibuat</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Home