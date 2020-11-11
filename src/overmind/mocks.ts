import { Segment } from './state'

export const mockSegment: Segment = {
  id: '1',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  name: 'mock segment',
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
