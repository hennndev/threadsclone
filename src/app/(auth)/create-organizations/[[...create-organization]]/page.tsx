import { CreateOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link"
import { RiHomeSmile2Line } from 'react-icons/ri'

export default function CreateOrganizationPage() {
  return (
    <main className="h-screen">
      <div className="mt-[70px]">
        <div className="flex-center mt-auto">
          <div className="w-[500px] mx-auto mb-5">
            <Link href="/" className="text-gray-100 text-left hover:underline hover:text-blue-500 ml-3">Kembali ke beranda</Link>
          </div>
        </div>
        <div className="flex-center">
          <CreateOrganization appearance={{
            elements: {
              card: {
                maxWidth: "500px"
              },
            },
            baseTheme: dark
          }}/>
        </div>
      </div>
    </main>
  )
}