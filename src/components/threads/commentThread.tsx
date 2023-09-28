"use client"
import React, { Fragment, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import { DialogFooter } from '../ui/dialog'
import PostThread from '../forms/postThread'
import { usePathname } from 'next/navigation'
import usePreviewImage from '@/hooks/usePreviewImage'
import { uploadThreadComment } from '@/lib/actions/threads.actions'
import { useUploadThing } from '@/lib/functions/uploadthing'
import DropdownIsComment from '@/components/threads/dropdownIsComment'

type PropsTypes = {
  usernamePost: string
  parentId: string
  currentUserData: UserInfoTypes
}
type FormTypes = {
  text: string
  image: FileList | null
}

const CommentThread = ({parentId, usernamePost, currentUserData: {id, username, image}}: PropsTypes) => {
  const { toast } = useToast()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCommented, setIsCommented] = useState<string>("allowed")
  const { startUpload } = useUploadThing("media")
  const { file, setFile, prevImage, setPrevImage, handleImage } = usePreviewImage()
  const form = useForm<FormTypes>({
    defaultValues: {
      text: "",
      image: null
    }
  })
  const { register, setValue, watch, reset, handleSubmit } = form

  const uploadAction = async ({text, id, image}: {
    text: string | null, 
    id: string, 
    image: {
      imageKey: string,
      imageUrl: string
    } | null
  }) => {
    await uploadThreadComment({ 
      text, 
      userId: id, 
      parentId, 
      image, 
      isCommented,
      usernamePost, 
      path: pathname })
    .then(() => {
      setIsLoading(false)
      reset()
      setPrevImage(null)
      setFile([])
      toast({
        duration: 3000,
        title: "Berhasil!",
        description: "Thread berhasil dibuat",
      })
    })
  }
  
  const handleUploadThread = async (values: FormTypes) => {
    setIsLoading(true)
    try {
      if(file.length > 0) {
        const imgResult = await startUpload(file)
        if(imgResult) {
          await uploadAction({
            text: values.text === "" ? null : values.text,
            id,
            image: {
              imageKey: imgResult[0].key,
              imageUrl: imgResult[0].url
            }
          })
        }
      } else {
        await uploadAction({
          text: values.text === "" ? null : values.text,
          id,
          image: null
        })
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        duration: 3000,
        title: "Gagal!",
        description: "Thread gagal dibuat",
      })
    }
  }
  const handleDeleteImage = () => {
    setPrevImage("")
    setFile([])
    setValue("image", null)
  }

  return (
    <Fragment>
      <PostThread 
        file={file}
        image={image} 
        username={username} 
        isLoading={isLoading} 
        register={register} 
        prevImage={prevImage} 
        handleDeleteImage={handleDeleteImage} 
        handleImage={handleImage}/>
      <DialogFooter className="flex-between mt-10">
        {isLoading ? <p className="text-sm text-gray-500 mr-10 cursor-pointer">
            {isCommented === "allowed" ? "Aktifkan" : "Non aktifkan"} komentar</p> : null}
        {!isLoading ? <DropdownIsComment isCommented={isCommented} handleIsCommented={(value) => setIsCommented(value)}/> : null}
        <button 
          onClick={handleSubmit(handleUploadThread)} 
          disabled={(watch("text") || watch("image")) && !isLoading ? false : true} 
          className={`button-thread ${watch("text") || watch("image") ? isLoading ? "text-gray-500 cursor-not-allowed" : "text-black dark:text-gray-100 font-semibold cursor-pointer" : "text-gray-500 cursor-not-allowed"} flexx`}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Loading" : "Kirim"}
        </button>
      </DialogFooter>
    </Fragment>
  )
}

export default CommentThread