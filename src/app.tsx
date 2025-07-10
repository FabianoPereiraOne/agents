import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Audio } from "./pages/audio"
import { Room } from "./pages/room"
import { Rooms } from "./pages/rooms"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/rooms/:roomId' element={<Room />} />
          <Route path='/room/:roomId/audio' element={<Audio />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
