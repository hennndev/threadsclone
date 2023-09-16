import { currentUser } from '@clerk/nextjs'
import Threads from '@/components/threads/threads'
import { fetchUser } from '@/lib/actions/user.actions'
import { getThreads } from '@/lib/actions/threads.actions'
import CreateThread from '@/components/threads/createThread'

export const metadata = {
  title: "Beranda"
}

const Home = async () => {
  const threads: Awaited<ThreadsTypes[]> = await getThreads()
  const userLoggedIn = await currentUser()
  if(!userLoggedIn) return null
  const user = await fetchUser(userLoggedIn.id)

  //create thread ✅
  //show threads ✅
  //infinite scroll ❌
  

  return (
    <section className="w-full flex-center p-5">
      <div className="w-[550px]">
        <CreateThread userId={user._id.toString()} username={user.username} userImageUrl={user.image.imageUrl}/>
        <Threads data={threads}/>
      </div>
    </section>
  )
}

export default Home