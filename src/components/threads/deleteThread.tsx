"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { deleteThread } from '@/lib/actions/threads.actions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'

type PropsTypes = {
  threadId: string
  userId: string
  imageKey?: string | null
  closePopover: () => void
}

const DeleteThread = ({threadId, userId, imageKey = null, closePopover}: PropsTypes) => {

  const { toast } = useToast()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteThread(threadId, userId, imageKey, pathname)
      toast({
        duration: 3000,
        title: "Berhasil",
        description: "Thread berhasil dihapus"
      })
    } catch (error) {
      toast({
        duration: 3000,
        title: "Gagal",
        description: "Thread gagal dihapus"
      })
    } finally {
      setIsLoading(false)
      setOpen(false)
      closePopover()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-red-600 dark:text-red-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Hapus thread</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[330px] xs:w-[400px] sm:w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus thread?</AlertDialogTitle>
          <AlertDialogDescription>
            Thread akan dihapus secara permanan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button variant="destructive" disabled={isLoading} onClick={handleDelete}>Hapus</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteThread