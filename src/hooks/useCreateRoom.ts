import type { CreateRoomRequest, CreateRoomResponse } from "@/types/rooms"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const result = await fetch("http://localhost:3333/rooms", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const response: CreateRoomResponse = await result.json()
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] })
    }
  })
}
