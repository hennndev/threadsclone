"use client"
import React, { ChangeEvent } from 'react'
import Image from 'next/image'
import { Paperclip, X } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

type PropsTypes = {
  file: File[]
  image: string
  username: string
  isLoading: boolean
  prevImage: string | null
  handleDeleteImage: () => void
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<{text: string, image: FileList | null}>
}

const PostThread = ({ image, username, isLoading, register, prevImage, handleDeleteImage, handleImage, file }: PropsTypes) => {
  return (
    <div className="w-full flex">
      <div className="relative w-[30px] h-[30px] rounded-full mr-3">
        <Image fill sizes="auto" src={image} alt={username} quality={75} className="w-full h-full object-cover rounded-full"/>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="font-medium mb-2 text-sm">{username}</h3>
        <Textarea 
          rows={3} 
          tabIndex={-1} 
          disabled={isLoading}
          {...register("text")}
          placeholder="Mulai ulas .." 
          className="resize-none border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium placeholder:text-gray-500 text-sm p-0"/>
        <div className="w-max">
          {!prevImage && file.length < 1 ? <label htmlFor="threadFile">
              <Paperclip className="mt-1 w-4 text-gray-500 cursor-pointer"/>
            </label> : (
            !isLoading ? <div className="flexx text-sm cursor-pointer mb-3" onClick={() => !isLoading && handleDeleteImage()}>
              <X className="w-5 h-5 text-red-500 dark:text-red-200 mr-1"/>
              <p>Hapus gambar</p>
            </div> : null
          )}
          <input disabled={isLoading} type="file" accept="image/*" id="threadFile" className="hidden" {...register("image", {
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleImage(e)
          })}/>
        </div>
        {prevImage && (
          <Image width={0} height={0} sizes="auto" src={prevImage} alt={"thread-img"} className="w-auto h-auto object-cover mt-2"/>
        )}
      </div>
    </div>
  )
}

export default PostThread