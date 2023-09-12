import { SignIn } from "@clerk/nextjs"
import { dark } from '@clerk/themes'


export const metadata = {
  title: "Sign in"
}

export default function Signin() {
  return (
    <section className="flex-center h-screen">
      <SignIn redirectUrl="/onboarding" appearance={{
        baseTheme: dark
      }}/>
    </section>
  )
}