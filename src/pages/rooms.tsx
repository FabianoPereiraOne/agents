import type { Room } from "@/types/rooms"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export const Rooms = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3333/rooms")
      const response: Room[] = await result.json()
      return response
    }
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className='flex flex-col gap-1'>
        {data?.map(room => {
          const id = room?.id
          const name = room?.name

          return (
            <Link to={`/rooms/${id}`} key={id}>
              {name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
