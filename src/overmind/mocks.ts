import { Question, Segment } from './state'

export const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'TEXT',
    question: 'Mock question 1',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Mock answer',
    },
  },
  {
    id: '2',
    type: 'SOUND',
    question: 'Mock question 2',
    answer: {
      type: 'PHYSICAL',
      value: 'Mock answer 2',
    },
  },
]

export const mockSegment1: Segment = {
  id: '1',
  name: 'FIRST SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [],
}

export const mockSegment2: Segment = {
  id: '2',
  name: 'SECOND SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [],
}

export const mockSegment3: Segment = {
  id: '3',
  name: 'THIRD SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [],
}
