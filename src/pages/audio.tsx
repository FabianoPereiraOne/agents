import { Button } from "@/components/ui/button"
import type { CreateRoomResponse } from "@/types/rooms"
import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function"

export const Audio = () => {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  const params = useParams<CreateRoomResponse>()

  if (!params.roomId) {
    return <Navigate replace to='/' />
  }

  const uploadAudio = async (audio: Blob) => {
    const formData = new FormData()
    formData.append("file", audio, "audio.webm")

    const result = await fetch(
      `http://localhost:3333/rooms/${params?.roomId}/audio`,
      {
        method: "POST",
        body: formData
      }
    )

    const response = await result.json()
    console.log(response)
  }

  const stopRecording = () => {
    if (recorder.current && recorder.current.state !== "inactive") {
      console.log("stop")
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const createRecorder = async (audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000
    })

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log("Gravação iniciada!")
    }

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada")
    }

    recorder.current.start()
  }

  const startRecording = async () => {
    if (!isRecordingSupported) {
      return alert("O seu navegador não suporta gravação de audio.")
    }

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100
      }
    })

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  const toggleRecording = () => {
    setIsRecording(prev => !prev)

    if (isRecording) return stopRecording()

    startRecording()
  }

  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-6'>
      <Button onClick={toggleRecording}>
        {isRecording ? "Parar audio" : "Gravar audio"}
      </Button>

      {isRecording ? (
        <div className='flex gap-2 items-center'>
          <Loader2 className='size-4 animate-spin text-primary' />
          <p> Gravando...</p>
        </div>
      ) : (
        <p>Encerrado/Pausado.</p>
      )}
    </div>
  )
}
