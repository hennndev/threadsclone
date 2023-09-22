import { dark } from '@clerk/themes'
import { ClerkProvider } from '@clerk/nextjs'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <main className="bg-[#101010]">
        {children}
      </main>    
    </ClerkProvider>
  )
}
