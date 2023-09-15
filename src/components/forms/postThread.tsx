"use client"
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { Paperclip, X } from 'lucide-react'

type PropsTypes = {
  username: string
  userImageUrl: string
  caption: string
  setCaption: (value: string) => void
  file: File[] | []
  setFile: (value: File[]) => void
}

const PostThread = ({
  username,
  userImageUrl,
  caption,
  setCaption,
  file,
  setFile
}: PropsTypes) => {
  const [prevImage, setPrevImage] = useState<string | null>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
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
  }

  return (
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
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          rows={3} 
          tabIndex={-1} 
          placeholder="Mulai ulas .." 
          className="resize-none border-none flex-1 outline-none focus:ring-0 bg-transparent font-medium placeholder:text-gray-500 text-sm p-0"/>
        <div>
          {!prevImage && file.length < 1 ? <label htmlFor="threadFile">
            <Paperclip className="mt-1 w-4 text-gray-500 cursor-pointer"/>
          </label> : null}
          <input type="file" accept="image/*" id="threadFile" onChange={handleImage}/>
        </div>
        {prevImage && (
          <div className="relative h-[150px] w-[150px]">
            <X className="absolute -top-4 -right-4 cursor-pointer w-5 h-5 text-red-500 dark:text-red-200 z-10" onClick={handleDeleteImage}/>
            <Image fill sizes="auto" src={prevImage} alt="thread-file" className="w-full h-full object-cover"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostThread