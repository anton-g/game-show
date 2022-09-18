import { nanoid } from 'nanoid'
import { Context } from '..'
import { Question } from '../types'

export const createQuestion = (
  { state, effects }: Context,
  question: Question
) => {
  question.id = nanoid()
  state.questions[question.id] = question
  effects.router.goTo('/library') // TODO context based routing
}

export const updateQuestion = (
  { state, effects }: Context,
  question: Question
) => {
  if (!state.questions[question.id]) {
    console.log('error')
    return
  }

  state.questions[question.id] = question
  effects.router.goTo('/library')
}

export const deleteQuestion = (
  { state, effects }: Context,
  questionId: string
) => {
  delete state.questions[questionId]
  effects.router.goTo('/library')
}
