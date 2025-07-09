import { RoomForm } from "@/components/RoomForm"
import { RoomList } from "@/components/RoomList"

export const Rooms = () => {
  return (
    <div className='min-h-screen w-full p-8'>
      <div className='mx-auto max-w-4xl py-8 px-4 '>
        <div className='grid grid-cols-2 gap-6 items-start'>
          <RoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  )
}
