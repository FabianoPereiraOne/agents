import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Room } from "./pages/room"
import { Rooms } from "./pages/rooms"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/rooms/:id' element={<Room />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
