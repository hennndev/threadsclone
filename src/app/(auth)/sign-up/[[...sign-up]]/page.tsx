import { SignUp } from "@clerk/nextjs"
import { dark } from '@clerk/themes'

export const metadata = {
  title: "Sign up"
}
 
export default function Signup() {
  return (
    <section className="flex-center h-screen">
      <SignUp redirectUrl="/onboarding" appearance={{
        baseTheme: dark
      }}/>
    </section>
  )
}