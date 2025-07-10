import type {
  Question,
  QuestionRequest,
  QuestionResponse
} from "@/types/questions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateQuestion = (roomId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: QuestionRequest) => {
      const result = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
      const response: QuestionResponse = await result.json()
      return response
    },
    onMutate({ question }) {
      const questions =
        queryClient.getQueryData<Question[]>(["get-questions", roomId]) ??
        ([] as Question[])

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true
      }

      queryClient.setQueryData<Question[]>(
        ["get-questions", roomId],
        [newQuestion, ...questions]
      )

      return { newQuestion, questions }
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<Question[]>(
        ["get-questions", roomId],
        questions => {
          if (!questions || !context.newQuestion) {
            return questions
          }

          return questions.map(question => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data?.answer,
                isGeneratingAnswer: false
              }
            }

            return question
          })
        }
      )
    },
    onError(_data, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<Question[]>(
          ["get-questions", roomId],
          context.questions
        )
      }
    }

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] })
    // }
  })
}
