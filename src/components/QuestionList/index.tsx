import { useGetQuestions } from "@/hooks/useGetQuestions"
import type { CreateRoomResponse } from "@/types/rooms"
import { QuestionItem } from "../question-item"

export const QuestionList = ({ roomId }: CreateRoomResponse) => {
  const { data } = useGetQuestions(roomId)

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-2xl text-foreground'>
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map(question => {
        const id = question?.id

        return <QuestionItem key={id} question={question} />
      })}
    </div>
  )
}
