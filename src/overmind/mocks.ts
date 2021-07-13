import { Question, Segment } from './state'

export const mockQuestions: Record<Question['id'], Question> = {
  '1': {
    id: '1',
    type: 'TEXT',
    question: 'Vad heter låten?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Campione 2000',
    },
  },
  // '2': {
  //   id: '2',
  //   type: 'SOUND',
  //   question: 'Hur stavas "encyklopedi"?',
  //   answer: {
  //     type: 'PHYSICAL',
  //     value: 'ENCYKLOPEDI',
  //   },
  // },
  '3': {
    id: '3',
    type: 'IMAGE',
    question: 'Vem är det här?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Nils Karlsson Pyssling',
    },
  },
  '4': {
    id: '4',
    type: 'VIDEO',
    question: 'Vart är vi på väg?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'Söderhamn',
        b: 'Södertälje',
        c: 'Söderköping',
        d: 'Södertörn',
      },
    },
  },
}

export const mockSegment1: Segment = {
  id: '1',
  name: 'FIRST SEGMENT',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [mockQuestions['1'], mockQuestions['3'], mockQuestions['4']],
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
