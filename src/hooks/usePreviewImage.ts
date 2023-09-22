import React, { useState, ChangeEvent } from 'react'

const usePreviewImage = () => {
  const [prevImage, setPrevImage] = useState<string | null>(null)
  const [file, setFile] = useState<File[]>([])

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

  return {
    prevImage,
    file,
    setFile,
    setPrevImage,
    handleImage
  }
}

export default usePreviewImage