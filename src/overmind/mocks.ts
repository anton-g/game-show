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
    scoring: {
      value: 1,
    },
  },
  '2': {
    id: '2',
    type: 'TEXT',
    question: 'Vad heter låten?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'This is the way',
    },
    scoring: {
      value: 1,
    },
  },
  '3': {
    id: '3',
    type: 'IMAGE',
    question: 'Vem är det här?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Nils Karlsson Pyssling',
    },
    scoring: {
      value: 1,
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
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '5': {
    id: '5',
    type: 'TEXT',
    question: 'Vad heter låten?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Angels Crying',
    },
    scoring: {
      value: 1,
    },
  },
  '6': {
    id: '6',
    type: 'TEXT',
    question: 'Vad heter artisten??',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'E-Type',
        b: 'Martin Eriksson',
        c: 'Majtin Ejiksson',
        d: 'ABBA',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '7': {
    id: '7',
    type: 'IMAGE',
    question: 'Vem är det här?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'E-Type',
    },
    scoring: {
      value: 1,
    },
  },
  '8': {
    id: '8',
    type: 'IMAGE',
    question: 'Vem är det här?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'Martin Eriksson',
        b: 'Erik Martinsson',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '9': {
    id: '9',
    type: 'VIDEO',
    question: 'Vad händer sen?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson dyker upp från ingenstans.',
    },
    scoring: {
      value: 5,
    },
  },
  '10': {
    id: '10',
    type: 'VIDEO',
    question: 'Hur många gånger sjunger E-Type "life"?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: '23',
        b: '46',
        c: '239',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '11': {
    id: '11',
    type: 'TEXT',
    question: 'Vad heter artisten?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'E-Type',
    },
    scoring: {
      value: 1,
    },
  },
  '12': {
    id: '12',
    type: 'TEXT',
    question: 'Vad heter E-Type?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson',
    },
    scoring: {
      value: 1,
    },
  },
  '13': {
    id: '13',
    type: 'IMAGE',
    question: 'Hur många lingon finns det i världen?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: '42',
    },
    scoring: {
      value: 1,
    },
  },
  '14': {
    id: '14',
    type: 'VIDEO',
    question: 'Vem kom först, E-Type eller Martin Eriksson?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'E-Type',
        b: 'Martin Eriksson',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '15': {
    id: '15',
    type: 'TEXT',
    question: 'Vad heter du?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson',
    },
    scoring: {
      value: 1,
    },
  },
  '16': {
    id: '16',
    type: 'TEXT',
    question: 'Vad tycker du om E-Type?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'Fantastisk',
        b: 'Magisk',
        c: 'Helt underbar',
        d: 'Bästa sen skivat bröd',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '17': {
    id: '17',
    type: 'IMAGE',
    question: 'Vem är inte det här?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'E-Type',
    },
    scoring: {
      value: 1,
    },
  },
  '18': {
    id: '18',
    type: 'IMAGE',
    question: 'Vems hår är det här?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'Martin Eriksson',
        b: 'Leif Pagrotsky',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
  },
  '19': {
    id: '19',
    type: 'VIDEO',
    question: 'Vad hände innan?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'De såg Martin Eriksson.',
    },
    scoring: {
      value: 5,
    },
  },
}

export const mockSegment1: Segment = {
  id: '1',
  name: 'First segment',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: Object.values(mockQuestions).slice(0, 3),
}

export const mockSegment2: Segment = {
  id: '2',
  name: 'Second',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [],
}

export const mockSegment3: Segment = {
  id: '3',
  name: '3rd',
  intro: {
    type: 'VIDEO',
    src: '',
  },
  questions: [],
}
