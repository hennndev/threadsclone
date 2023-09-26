"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/functions/uploadthing'
import ModalCreateThread from '../shared/modalCreateThread'
import usePreviewImage from '@/hooks/usePreviewImage'
import DropdownIsComment from '@/components/threads/dropdownIsComment'
import PostThread from '../forms/postThread'
import { Loader2 } from 'lucide-react'
import { editThread } from '@/lib/actions/threads.actions'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

type PropsTypes = { 
  dataEdit: {
    id: string
    text: string,
    image: {
      imageKey?: string
      imageUrl: string
    } | null
    isCommented: string
  }
  currentUserData: UserInfoTypes
  closePopover: () => void
}

type FormTypes = {
  text: string
  image: FileList | null
}

const EditThread = ({dataEdit, currentUserData: {id, username, image, onboarded}, closePopover}: PropsTypes) => {

  const { toast } = useToast()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const { startUpload } = useUploadThing("media")
  const [isCommented, setIsCommented] = useState("allowed")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { file, setFile, prevImage, setPrevImage, handleImage } = usePreviewImage()
  const form = useForm<FormTypes>({
    defaultValues: {
      text: "",
      image: null
    }
  })
  const { register, setValue, watch, reset, handleSubmit } = form

  const uploadAction = async ({text, image, oldImageKey = null}: {
    text: string | null, 
    image: {
      imageKey?: string,
      imageUrl: string
    } | null
    oldImageKey?: string | null
  }) => {
    await editThread({ text, threadId: dataEdit.id.toString(), image, isCommented, oldImageKey, path: pathname })
    .then(() => {
      setIsLoading(false)
      reset()
      setPrevImage(null)
      setFile([])
      setOpen(false)
      toast({
        duration: 3000,
        title: "Berhasil!",
        description: "Thread berhasil diedit",
      })
    })
  }
  
  
  const handleUploadThread = async (values: FormTypes) => {
    setIsLoading(true)
    try {
      if(file.length > 0) { //Jika mengunggah image baru atau mereplace image
        const imgResult = await startUpload(file)
        if(imgResult) {
          await uploadAction({
            text: values.text === "" ? null : values.text,
            image: {
              imageKey: imgResult[0].key,
              imageUrl: imgResult[0].url
            },
            oldImageKey: dataEdit.image?.imageKey ? dataEdit.image?.imageKey : null
          })
        }
      } else if(dataEdit.image?.imageKey && !prevImage && file.length < 1) { //jika terdapat image lama, dan mau dihapus
        await uploadAction({
          text: values.text === "" ? null : values.text,
          image: null,
          oldImageKey: dataEdit.image?.imageKey
        })
      } else { //jika hanya mengubah text saja
        await uploadAction({
          text: values.text === "" ? null : values.text,
          image: dataEdit?.image
        })
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Gagal!",
        description: "Thread gagal diedit",
      })
    } finally {
      closePopover()
    }
  }

  const handleDeleteImage = () => {
    setFile([])
    setPrevImage(null)
    setValue("image", null)
  } 

  useEffect(() => {
    if(dataEdit) {
      setValue("text", dataEdit?.text)
      setPrevImage(dataEdit.image?.imageUrl || null)
      setIsCommented(dataEdit.isCommented)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit])
  
  return (
    <Dialog open={onboarded ? open : false} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="py-2 px-4 pb-3 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border-b border-[#ccc] dark:border-[#2b2b2b] hover:border-transparent hover:bg-gray-100 dark:hover:bg-[#222]">Edit thread</p>
      </DialogTrigger>
      <DialogContent className="w-[330px] xs:w-[400px] sm:w-[500px] md:w-[600px] max-h-[600px] overflow-y-auto">
        <PostThread image={image} username={username} isLoading={isLoading} register={register} prevImage={prevImage} handleDeleteImage={handleDeleteImage} handleImage={handleImage} file={file}/>
        <DialogFooter className="flex-between mt-10">
          {isLoading && <p className="text-sm text-gray-500 mr-10 cursor-pointer">{isCommented === "allowed" ? "Aktifkan" : "Non aktifkan"} komentar</p>}
          {!isLoading && <DropdownIsComment isCommented={isCommented} handleIsCommented={(value) => setIsCommented(value)}/>}
          <button 
            onClick={handleSubmit(handleUploadThread)} disabled={(watch("text") || watch("image")) && !isLoading ? false : true}  className={`button-thread ${watch("text") || watch("image") ? isLoading ? "text-gray-500 cursor-not-allowed" : "text-black dark:text-gray-100 font-semibold cursor-pointer" : "text-gray-500 cursor-not-allowed"} flexx`}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Loading" : "Edit"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditThread