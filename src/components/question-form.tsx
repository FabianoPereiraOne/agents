import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  createQuestionSchema,
  type CreateQuestionFormData
} from "@/schemas/validations/questionsForm"
import type { CreateRoomResponse } from "@/types/rooms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function QuestionForm({ roomId }: CreateRoomResponse) {
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: ""
    }
  })

  function handleCreateQuestion(data: CreateQuestionFormData) {
    console.log(data, roomId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='flex flex-col gap-4'
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      className='min-h-[100px]'
                      placeholder='O que você gostaria de saber?'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Enviar pergunta</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
