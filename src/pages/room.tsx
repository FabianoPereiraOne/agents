import { Navigate, useParams } from "react-router-dom"

export const Room = () => {
  const params = useParams()
  const id = params?.id

  if (!id) return <Navigate to='/' replace />

  return <p>{id}</p>
}
