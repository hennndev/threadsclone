"use client"
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/store'
import { MoreVertical } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { clearActivties } from '@/lib/actions/user.actions'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  userLoggedInId: string
}

const ActivitiesHeader = ({userLoggedInId}: PropsTypes) => {
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const resetNotif = useStore((state) => state.resetNotif)

  useEffect(() => {
    resetNotif()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClearActivities = async () => {
    await clearActivties(userLoggedInId)
    toast({
      duration: 3000,
      title: "Berhasil",
      description: "List aktivitas berhasil dibersihkan"
    })
    setOpen(false)
  }
  return (
    <div className="flex-between mb-2">
      <h1 className="font-bold text-2xl mb-3">Aktivitas</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <MoreVertical className="cursor-pointer w-5 h-5"/>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-50 p-0">
          <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Urutkan berdasarkan waktu</p>
          <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]" onClick={handleClearActivities}>Bersihkan</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default ActivitiesHeader