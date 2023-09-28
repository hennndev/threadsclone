"use client"
import React, { ChangeEvent, useState } from 'react'
import * as z from 'zod'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'
import { upsertUser } from '@/lib/actions/user.actions'
import { useUploadThing } from '@/lib/functions/uploadthing'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type PropsTypes = {
  isThemeClasses?: string
  userData: UserInfoTypes
  btnTitle: string
}

const ProfileForm = ({isThemeClasses, userData, btnTitle}: PropsTypes) => {

  const {toast} = useToast()
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

  const toastSuccess = () => {
    if(pathname !== "onboarding") {
      toast({
        duration: 3000,
        title: "Berhasil",
        description: "Profil berhasil diedit"
      })
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
            id: userData.id.toString(),
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
            toastSuccess()
            if(pathname === "/onboarding") {
              router.push("/")
            } else {
              router.push(`/${values.username}`)
            }
          })
        }
      } else {
        await upsertUser({
          id: userData.id.toString(),
          name: values.name,
          username: values.username,
          image: {
            imageKey: userData.imageKey || null || undefined,
            imageUrl: userData.image
          },
          path: pathname,
          bio: values.bio
        }).then(() => {
          setIsLoading(false)
          toastSuccess()
          if(pathname === "/onboarding") {
            router.push("/")
          } else {
            router.push(`/${values.username}`)
          }
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
              <FormLabel htmlFor="profile_photo" className="text-center text-blue-500 dark:text-blue-300 cursor-pointer hover:underline">
                Upload Image
              </FormLabel>
              <FormControl className="flex-1">
                <Input type="file" accept="image/*" id="profile_photo" className="profile-input hidden" placeholder="Your name" onChange={(e) => handleImage(e, field.onChange)} />
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
              <FormLabel className={`profile-label ${isThemeClasses ? "text-gray-700 dark:text-gray-200" : ""}`}>Name</FormLabel>
              <FormControl>
                <Input className={`profile-input ${isThemeClasses ? isThemeClasses : "bg-[#151515]"}`} placeholder="Your name" {...field} />
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
              <FormLabel className={`profile-label ${isThemeClasses ? "text-gray-700 dark:text-gray-200" : ""}`}>Username</FormLabel>
              <FormControl>
                <Input className={`profile-input ${isThemeClasses ? isThemeClasses : "bg-[#151515]"}`} placeholder="shadcn" {...field} />
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
              <FormLabel className={`profile-label ${isThemeClasses ? "text-gray-700 dark:text-gray-200" : ""}`}>Bio</FormLabel>
              <FormControl>
                <Textarea rows={8} className={`profile-input ${isThemeClasses ? isThemeClasses : "bg-[#151515]"}`} placeholder="Your bio" {...field} />
              </FormControl>
              <FormDescription>
                *Optional. Kamu bisa mengabaikan kolom ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Please wait" : btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm