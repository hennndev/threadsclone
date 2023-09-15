"use client"
import React, { useState, ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'
import { Paperclip, X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { uploadThread } from '@/lib/actions/threads.actions'
import { useUploadThing } from '@/lib/functions/uploadthing'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type PropsTypes = {
  children: React.ReactNode
  userId: string
  username: string
  userImageUrl: string
}

const ModalCreateThread = ({children, userId, username, userImageUrl}: PropsTypes) => {

  const { toast } = useToast()
  const [file, setFile] = useState<File[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [isCommented, setIsCommented] = useState("everyone")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prevImage, setPrevImage] = useState<string | null>(null)
  const form = useForm<{caption: string, image: FileList | null}>({
    defaultValues: {
      caption: "",
      image: null
    }
  })
  const { startUpload } = useUploadThing("media")
  const { register, setValue, watch, reset, handleSubmit } = form

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      setFile(Array.from(e.target.files))
      const file = e.target.files[0] as File
      const readerImg: FileReader = new FileReader()
      readerImg.readAsDataURL(file)
      readerImg.onloadend = () => {
        const result: string = readerImg.result as string
        setPrevImage(result)
      }
    }
  }

  const handleDeleteImage = () => {
    setPrevImage("")
    setFile([])
    setValue("image", null)
  }
  
  const uploadAction = async ({text, userId, image}: {
    text: string | null, 
    userId: string, image: {
      imageKey: string,
      imageUrl: string
    } | null
  }) => {
    await uploadThread({
      text: text,
      userId: userId,
      image: image,
      isCommented: isCommented
    }).then(() => {
      setIsLoading(false)
      reset()
      setPrevImage("")
      setFile([])
      setOpen(false)
      toast({
        duration: 3000,
        title: "Berhasil!",
        description: "Thread berhasil dibuat",
      })
    })
  }
  
  const handleUploadThread = async (values: any) => {
    setIsLoading(true)
    try {
      if(file.length > 0) {
        const imgResult = await startUpload(file)
        if(imgResult) {
          await uploadAction({
            text: values.caption === "" ? null : values.caption,
            userId: userId,
            image: {
              imageKey: imgResult[0].key,
              imageUrl: imgResult[0].url
            }
          })
        }
      } else {
        await uploadAction({
          text: values.caption === "" ? null : values.caption,
          userId: userId,
          image: null
        })
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Gagal!",
        description: "Thread gagal dibuat",
      })
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="w-[330px] md:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Buat thread baru</DialogTitle>
          </DialogHeader>

          <div className="w-full flex">
            <div className="relative w-[30px] h-[30px] rounded-full mr-3">
              <Image fill sizes="auto" src={userImageUrl} 
                alt="avatar" 
                quality={75}
                className="w-full h-full object-cover rounded-full"/>
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="font-medium mb-2 text-sm">{username}</h3>
              <Textarea 
                disabled={isLoading}
                {...register("caption")}
                rows={3} 
                tabIndex={-1} 
                placeholder="Mulai ulas .." 
                className="resize-none border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium placeholder:text-gray-500 text-sm p-0"/>
              <div className="w-max">
                {!prevImage && file.length < 1 ? <label htmlFor="threadFile">
                  <Paperclip className="mt-1 w-4 text-gray-500 cursor-pointer"/>
                </label> : null}
                <input disabled={isLoading} type="file" accept="image/*" id="threadFile" className="hidden" {...register("image", {
                  onChange: (e) => handleImage(e)
                })}/>
              </div>
              {prevImage && (
                <div className="relative h-[150px] w-[150px]">
                  <X className="absolute -top-4 -right-4 cursor-pointer w-5 h-5 text-red-500 dark:text-red-200 z-10" onClick={() => !isLoading && handleDeleteImage()}/>
                  <Image fill sizes="auto" src={prevImage} alt="thread-file" className="w-full h-full object-cover"/>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-between mt-10">
            {isLoading && <p className="text-sm text-gray-500 mr-10 cursor-pointer">{isCommented === "everyone" ? "Siapa saja" : "Pengikut"} bisa membalas</p>}
            {!isLoading && (
              <Popover>
                <PopoverTrigger asChild>
                  <p className="text-sm text-gray-500 mr-10 cursor-pointer">{isCommented} bisa membalas</p>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                  <p className={`py-2 px-4 pb-3 text-sm cursor-pointer border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222] ${isCommented === "Siapa saja" ? "border-transparent bg-gray-100 dark:bg-[#222]" : "text-gray-600 dark:text-gray-300"}`} onClick={() => setIsCommented("everyone")}>Siapa saja</p>
                  <p className={`py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222] ${isCommented === "Pengikut" ? "border-transparent bg-gray-100 dark:bg-[#222]" : "text-gray-600 dark:text-gray-300"}`} onClick={() => setIsCommented("followers")}>Pengikut</p>
                </PopoverContent>
              </Popover>
            )}
            {/* caption false or file false ? true : false */}
            <button onClick={handleSubmit(handleUploadThread)} disabled={(watch("caption") || watch("image")) && !isLoading ? false : true} className={`border w-max border-gray-300 dark:border-[#2b2b2b] px-3 py-2 rounded-lg bg-transparent text-sm ${watch("caption") || watch("image") ? isLoading ? "text-gray-500 cursor-not-allowed" : "text-black dark:text-gray-100 font-semibold cursor-pointer" : "text-gray-500 cursor-not-allowed"} flexx`}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Loading" : "Kirim"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalCreateThread