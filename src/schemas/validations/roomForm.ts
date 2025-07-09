import { z } from "zod"

export const roomFormSchema = z.object({
  name: z.string().trim().min(3, { message: "Mínimo de 3 caracteres" }),
  description: z.string()
})

export type typeRoomFormSchema = z.infer<typeof roomFormSchema>
