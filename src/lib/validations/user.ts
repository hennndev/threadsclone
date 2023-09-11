import * as z from 'zod'


export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3, {message: "Minimum length name is 3 character"}).max(30, {message: "Maximum length name is 30 character"}).nonempty("This field is required"),
  username: z.string().min(3, {message: "Minimum length name is 3 character"}).max(30, {message: "Maximum length name is 30 character"}).nonempty("This field is required"),
  bio: z.string().max(1000, {message: "Maximum length bio is 1000 character"})
})