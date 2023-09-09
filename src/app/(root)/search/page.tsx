import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const SearchPage = () => {
  return (
    <section className="fixed bottom-16 lg:static w-full flex items-end lg:items-start justify-center p-5">
        <div className="w-[550px]">
          <div className="w-full flexx bg-gray-100 dark:bg-[#222] border border-gray-300 dark:border-neutral-600 rounded-2xl py-4 px-7">
            <RiSearch2Line className="text-xl text-gray-500 mr-5"/>
            <input type="text" className="flex-1 bg-transparent outline-none text-gray-500 border-none focus:ring-0" placeholder="Cari"/>
          </div>
        </div>
    </section>
  )
}

export default SearchPage