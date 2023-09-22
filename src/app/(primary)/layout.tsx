import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Toaster />
      <main className="flex min-h-screen flex-col bg-white dark:bg-[#101010]">
        <Navbar/>
        {children}
        <Footer/>
      </main>
    </ClerkProvider>
  )
}
