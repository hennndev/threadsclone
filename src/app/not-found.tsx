import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: "Page not found"
}

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-[#101010]">
      <section className="flex-1 flex-center flex-col text-center space-y-3">
        <h3>Maaf, halaman tidak tersedia</h3>
        <p className="text-gray-700 dark:text-gray-400 text-sm w-[400px]">
          Tautan yang Anda ikuti mungkin rusak, halaman mungkin sudah dihapus atau user tidak ditemukan.
        </p>
        <Link href="/">
          <Button variant="outline">Kembali</Button>
        </Link>
      </section>
      <Footer/>
    </main>
  )
}

export default NotFound