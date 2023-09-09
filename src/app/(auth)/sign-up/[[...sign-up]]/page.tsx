import { SignUp } from "@clerk/nextjs";
 
export default function Signup() {
  return (
    <section className="flex-center h-screen">
      <SignUp/>
    </section>
  )
}