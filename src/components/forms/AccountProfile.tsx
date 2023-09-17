"use client"
import React, { ChangeEvent, useState, useEffect } from 'react'
import * as z from 'zod'
import Image from 'next/image'
import { useUser } from '@/store/user'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'
import { upsertUser } from '@/lib/actions/user.actions'
import { useUploadThing } from '@/lib/functions/uploadthing'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


interface PropsTypes {
  userData: {
    id: string
    objectId?: string
    image: string
    username: string
    name: string
    bio: string
    onboarded: boolean
  },
  btnTitle: string
}

const AccountProfile = ({userData, btnTitle}: PropsTypes) => {

  const router = useRouter()
  const pathname = usePathname()
  const [file, setFile] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: userData?.image || "",
      name: userData?.name || "",
      username: userData?.username || "",
      bio: userData?.bio || ""
    }
  })
  const { startUpload } = useUploadThing("media")

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    if(e.target.files && e.target.files.length > 0) {
      setFile(Array.from(e.target.files))
      const file = e.target.files[0] as File
      const readerImg: FileReader = new FileReader()
      readerImg.readAsDataURL(file)
      readerImg.onloadend = () => {
        const result: string = readerImg.result as string
        fieldChange(result)
      }
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    setIsLoading(true)
    const blob = values.profile_photo
    if(blob) {
      if(file.length > 0 && file) {
        const imgResult = await startUpload(file)
        if(imgResult) {
          await upsertUser({
            id: userData.id,
            name: values.name,
            username: values.username,
            image: {
              imageKey: imgResult[0].key,
              imageUrl: imgResult[0].url
            },
            path: pathname,
            bio: values.bio
          }).then(() => {
            setIsLoading(false)
            router.push("/")
          })
        }
      } else {
        await upsertUser({
          id: userData.id,
          name: values.name,
          username: values.username,
          image: {
            imageUrl: values.profile_photo
          },
          path: pathname,
          bio: values.bio
        }).then(() => {
          setIsLoading(false)
          router.push("/")
        })
        }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex-center flex-col">
              <FormLabel className="mb-3">
                {field.value ? (
                  <div className="relative w-[150px] h-[150px] rounded-full">
                    <Image fill priority sizes="auto" src={field.value} className="h-full object-contains rounded-full" alt="profile_photo"/>
                  </div>
                ): (
                  <div className="relative h-[150px]">
                    <Image fill priority sizes="auto" src={userData.image} className="h-full object-contains rounded-full" alt="profile_photo"/>
                  </div>
                )}
              </FormLabel>
              <FormLabel htmlFor="profile_photo" className="text-center text-blue-300 cursor-pointer hover:underline">
                Upload Image
              </FormLabel>
              <FormControl className="flex-1">
                <Input type="file" accept="image/*" id="profile_photo" className="bg-[#151515] border-none outline-none text-gray-300 hidden" placeholder="Your name" onChange={(e) => handleImage(e, field.onChange)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200 text-[14px]">Name</FormLabel>
              <FormControl>
                <Input className="bg-[#151515] border-none outline-none text-gray-300" placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200 text-[14px]">Username</FormLabel>
              <FormControl>
                <Input className="bg-[#151515] border-none outline-none text-gray-300" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200 text-[14px]">Bio</FormLabel>
              <FormControl>
                <Textarea rows={8} className="bg-[#151515] border-none outline-none text-gray-300" placeholder="Your bio" {...field} />
              </FormControl>
              <FormDescription>
                *Optional. You can skip this field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isLoading ? <Button variant="default" className="w-full" type="submit">{btnTitle}</Button> : ""}
        {isLoading ? <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button> : ""}
      </form>
    </Form>
  )
}

export default AccountProfile