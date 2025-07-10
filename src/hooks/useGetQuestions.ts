import type { Question } from "@/types/questions"
import { useQuery } from "@tanstack/react-query"

export const useGetQuestions = (roomId: string) => {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const result = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )
      const response: Question[] = await result.json()
      return response
    }
  })
}
