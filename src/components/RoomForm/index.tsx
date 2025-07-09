import { useCreateRoom } from "@/hooks/useCreateRoom"
import {
  roomFormSchema,
  type typeRoomFormSchema
} from "@/schemas/validations/roomForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export const RoomForm = () => {
  const formRoom = useForm<typeRoomFormSchema>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const { mutateAsync: createRoom } = useCreateRoom()

  const handlerSubmit = async ({ name, description }: typeRoomFormSchema) => {
    await createRoom({ name, description })
    formRoom.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Preencha os dados a seguir para criar uma nova sala.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...formRoom}>
          <form
            onSubmit={formRoom.handleSubmit(handlerSubmit)}
            className='flex flex-col gap-6'
          >
            <FormField
              control={formRoom.control}
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Digite o nome da sala...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={formRoom.control}
              name='description'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='resize-none' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type='submit' className='w-full'>
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
