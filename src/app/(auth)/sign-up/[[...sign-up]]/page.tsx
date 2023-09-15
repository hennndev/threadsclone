import { SignUp } from "@clerk/nextjs"

export const metadata = {
  title: "Sign up"
}
 
export default function Signup() {
  return (
    <section className="flex-center h-screen">
      <SignUp/>
    </section>
  )
}