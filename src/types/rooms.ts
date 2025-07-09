export type Room = {
  id: string
  name: string
  createdAt: string
  questionsCount: number
}

export type CreateRoomResponse = {
  roomId: string
}

export type CreateRoomRequest = {
  name: string
  description: string
}
