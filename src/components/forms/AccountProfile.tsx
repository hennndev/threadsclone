"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'


interface PropsTypes {
  userData: {
    id: string
    objectId: string
    image: string
    username: string
    name: string
    bio: string
  },
  btnTitle: string
}

const AccountProfile = ({userData, btnTitle}: PropsTypes) => {

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: userData?.image || "",
      name: userData?.name || "",
      username: userData?.username || "",
      bio: userData?.bio || ""
    }
  })

  const onSubmit = (values: z.infer<typeof UserValidation>) => {
    console.log(values)
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
                    <Image fill sizes="auto" src={field.value} className="h-full object-contains rounded-full" alt="profile_photo"/>
                  </div>
                ): (
                  <div className="relative h-[150px]">
                    <Image fill sizes="auto" src={userData.image} className="h-full object-contains rounded-full" alt="profile_photo"/>
                  </div>
                )}
              </FormLabel>
              <FormLabel htmlFor="profile_photo" className="text-center text-blue-300 cursor-pointer hover:underline">
                Upload Image
              </FormLabel>
              <FormControl className="flex-1">
                <Input type="file" id="profile_photo" className="bg-[#151515] border-none outline-none text-gray-300 hidden" placeholder="Your name" {...field} />
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
                *Optional
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" className="w-full" type="submit">{btnTitle}</Button>
      </form>
    </Form>
  )
}

export default AccountProfile