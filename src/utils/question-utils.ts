import { Question } from '../overmind/types'

export function getQuestionAnswer(question: Question): string {
  switch (question.answer.type) {
    case 'BUZZ_SINGLE':
    case 'PHYSICAL':
      return question.answer.value
    case 'OPTIONS_SINGLE':
      return question.answer.options[question.answer.correctOption]!
  }
}
