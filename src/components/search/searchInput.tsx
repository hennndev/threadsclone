"use client"
import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const SearchInput = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [searchTerm, setSearchTerm] = useState<string>( params.get("query") || "")
  const path = `${searchTerm ? `?query=${searchTerm}` : ""}`
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search${path}`)
  }
  const handleClear = () => {
    setSearchTerm("")
    router.push("/search")
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full flex-between bg-gray-100 dark:bg-[#222] border border-gray-300 dark:border-neutral-600 rounded-2xl py-4 px-7">
      <div className="flexx flex-1 mr-5">
        <Search className="text-xl text-gray-500 mr-5 cursor-pointer" onClick={() => router.push(`/search${path}`)}/>
        <input  
          type="text" 
          value={searchTerm}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none border-none focus:ring-0" placeholder="Cari"/>
      </div>
      {searchTerm ? <X className="text-xl text-gray-500 cursor-pointer" onClick={handleClear}/> : null}
    </form>
  )
}

export default SearchInput