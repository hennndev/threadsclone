import { currentUser } from '@clerk/nextjs'
import Threads from '@/components/threads/threads'
import { fetchUser } from '@/lib/actions/user.actions'
import { getThreads } from '@/lib/actions/threads.actions'
import CreateThread from '@/components/threads/createThread'
import { apiRoute } from '@/config/config'

export const metadata = {
  title: "Beranda"
}

type UserInfoTypes = {
  id: string
  name: string
  username: string
  image: string
  onboarded: boolean
}

const Home = async () => {
  const threads: ThreadsTypes[] = await getThreads()
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const user = await fetchUser(userLoggedIn.id)
  
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
        <Threads isLoggedIn={userLoggedIn.id} data={threads}/>
      </div>
    </section>
  )
}

export default Home