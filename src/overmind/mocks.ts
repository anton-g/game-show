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
      id: '1',
      type: 'TEXT',
      question: 'Mock question',
      answer: {
        type: 'BUZZ_SINGLE',
        value: 'Mock answer',
      },
    },
    {
      id: '2',
      type: 'SOUND',
      answer: {
        type: 'PHYSICAL',
        value: 'Mock answer 2',
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
      id: '1',
      type: 'TEXT',
      question: 'Mock question',
      answer: {
        type: 'BUZZ_SINGLE',
        value: 'Mock answer',
      },
    },
    {
      id: '2',
      type: 'SOUND',
      answer: {
        type: 'PHYSICAL',
        value: 'Mock answer 2',
      },
    },
  ],
}
