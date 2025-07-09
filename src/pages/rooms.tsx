import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { dayjs } from "@/lib/dayjs"
import type { Room } from "@/types/rooms"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight } from "lucide-react"
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
    <div className='min-h-screen w-full p-8'>
      <div className='mx-auto max-w-4xl py-8 px-4 '>
        <div className='grid grid-cols-2 gap-2'>
          <div />
          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>
              <CardDescription>
                Acesso rápido para as salas criadas recentemente
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              {isLoading && (
                <p className='text-muted-foreground text-sm'>
                  Carregando salas...
                </p>
              )}
              {data?.map(room => {
                const id = room?.id
                const createdAt = room?.createdAt
                const name = room?.name
                const questionsCount = room?.questionsCount

                return (
                  <Link
                    to={`/rooms/${id}`}
                    key={id}
                    className='flex justify-between w-full border rounded-lg py-2 px-4 items-center hover:bg-accent'
                  >
                    <div className='flex flex-1 flex-col gap-2'>
                      <h3 className='font-medium'>{name}</h3>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant='secondary'
                          className='text-xs bg-blue-600'
                        >
                          {dayjs(createdAt).toNow()}
                        </Badge>
                        <Badge
                          variant='secondary'
                          className='text-xs bg-green-600'
                        >
                          {questionsCount} Pergunta(s)
                        </Badge>
                      </div>
                    </div>
                    <span className='flex items-center gap-1 text-sm'>
                      Entrar
                      <ArrowRight className='size-3' />
                    </span>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
