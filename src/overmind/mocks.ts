import { Segment } from './state'

export const mockSegment1: Segment = {
  id: '1',
  name: 'FIRST SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [
    {
      id: '1-1',
      type: 'TEXT',
      question: 'Mock question 1-1',
      answer: {
        type: 'BUZZ_SINGLE',
        value: 'Mock answer',
      },
    },
    {
      id: '1-2',
      type: 'SOUND',
      question: 'Mock question 1-2',
      answer: {
        type: 'PHYSICAL',
        value: 'Mock answer 1-2',
      },
    },
  ],
}

export const mockSegment2: Segment = {
  id: '2',
  name: 'SECOND SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [
    {
      id: '2-1',
      type: 'TEXT',
      question: 'Mock question 2-1',
      answer: {
        type: 'BUZZ_SINGLE',
        value: 'Mock answer',
      },
    },
    {
      id: '2-2',
      type: 'SOUND',
      question: 'Mock question 2-2',
      answer: {
        type: 'PHYSICAL',
        value: 'Mock answer 2-2',
      },
    },
  ],
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
