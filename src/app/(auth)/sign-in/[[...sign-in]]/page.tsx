import { SignIn } from "@clerk/nextjs";
 
export default function Signin() {
  return (
    <section className="flex-center h-screen">
      <SignIn/>
    </section>
  )
}