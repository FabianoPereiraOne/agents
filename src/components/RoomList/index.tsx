import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useGetRooms } from "@/hooks/useGetRooms"
import { dayjs } from "@/lib/dayjs"
import { ArrowRight, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

export const RoomList = () => {
  const { data, isLoading } = useGetRooms()

  return (
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
            <Loader2 className='size-4 animate-spin text-primary' /> Carregando
            salas...
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
                  <Badge variant='secondary' className='text-xs bg-zinc-700'>
                    {dayjs(createdAt).toNow()}
                  </Badge>
                  <Badge variant='secondary' className='text-xs bg-green-600'>
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
  )
}
