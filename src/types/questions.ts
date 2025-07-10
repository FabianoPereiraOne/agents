export type Question = {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

export type QuestionItemProps = {
  question: Question
}

export type QuestionRequest = {
  question: string
}

export type QuestionResponse = {
  questionId: string
  answer: string | null
}
