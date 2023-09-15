import { SignIn } from "@clerk/nextjs"

export const metadata = {
  title: "Sign in"
}

export default function Signin() {
  return (
    <section className="flex-center h-screen">
      <SignIn/>
    </section>
  )
}