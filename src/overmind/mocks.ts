import {
  Question,
  QuestionSegmentType,
  ScoreSegmentType,
  SegmentQuestion,
  Show,
} from './types'

export const mockQuestions: Record<Question['id'], Question> = {
  'q-1': {
    id: 'q-1',
    type: 'TEXT',
    question: `What's the song name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Campione 2000',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-2': {
    id: 'q-2',
    type: 'TEXT',
    question: `What's the song name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'This is the way',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-3': {
    id: 'q-3',
    type: 'IMAGE',
    question: `Who's this?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Nils Karlsson Pyssling',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
      blurImage: true,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
  },
  'q-4': {
    id: 'q-4',
    type: 'VIDEO',
    question: 'Where are we going?',
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-5': {
    id: 'q-5',
    type: 'TEXT',
    question: `What's the song name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Angels Crying',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-6': {
    id: 'q-6',
    type: 'TEXT',
    question: `What's the artist name?`,
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-7': {
    id: 'q-7',
    type: 'IMAGE',
    question: `What is E-Types real name?`,
    lore: 'E-Type is pretty cool and all',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: true,
      timeLimit: 15,
      blurImage: false,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
  },
  'q-8': {
    id: 'q-8',
    type: 'IMAGE',
    question: `Who's this?`,
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
      blurImage: true,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
  },
  'q-9': {
    id: 'q-9',
    type: 'VIDEO',
    question: 'What happens next?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson shows up from nowhere.',
    },
    scoring: {
      value: 5,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-10': {
    id: 'q-10',
    type: 'VIDEO',
    question: 'How many times does E-Type sing the word "life"?',
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-11': {
    id: 'q-11',
    type: 'TEXT',
    question: `What's the artist name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'E-Type',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-12': {
    id: 'q-12',
    type: 'TEXT',
    question: `What's E-Type real name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 15,
    },
  },
  'q-13': {
    id: 'q-13',
    type: 'IMAGE',
    question: 'How many lingonberries are there in the world?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: '42',
    },
    scoring: {
      value: 1,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
      blurImage: true,
    },
  },
  'q-14': {
    id: 'q-14',
    type: 'VIDEO',
    question: 'Who came first, E-Type or Martin Eriksson?',
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-15': {
    id: 'q-15',
    type: 'TEXT',
    question: `What's your name?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-16': {
    id: 'q-16',
    type: 'TEXT',
    question: 'What do you think about E-Type?',
    answer: {
      type: 'OPTIONS_SINGLE',
      options: {
        a: 'Amazing',
        b: 'Magical',
        c: 'Wonderful',
        d: 'Best thing since sliced bread',
      },
      correctOption: 'a',
    },
    scoring: {
      value: 1,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
  'q-17': {
    id: 'q-17',
    type: 'IMAGE',
    question: `Who isn't this?`,
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'E-Type',
    },
    scoring: {
      value: 1,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
      blurImage: true,
    },
  },
  'q-18': {
    id: 'q-18',
    type: 'IMAGE',
    question: `Whos hair is this?`,
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
    settings: {
      manualReveal: false,
      timeLimit: 0,
      blurImage: true,
    },
    assets: {
      imageSrc:
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80',
    },
  },
  'q-19': {
    id: 'q-19',
    type: 'VIDEO',
    question: 'What happened before?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'De såg Martin Eriksson.',
    },
    scoring: {
      value: 5,
    },
    settings: {
      manualReveal: false,
      timeLimit: 0,
    },
  },
}

export const mockSegment1: QuestionSegmentType = {
  id: 'seg-1',
  type: 'QUESTIONS',
  name: 'First',
  position: 1,
  intro: {
    type: 'NONE',
  },
  questions: Object.values(mockQuestions)
    .slice(6, 10)
    .reduce((prev, curr, index) => {
      prev[curr.id] = {
        position: index + 1,
        question: curr,
      }

      return prev
    }, {} as Record<string, SegmentQuestion>),
}

export const mockSegment2: QuestionSegmentType = {
  id: 'seg-2',
  type: 'QUESTIONS',
  name: 'Second',
  position: 3,
  intro: {
    type: 'NONE',
  },
  questions: Object.values(mockQuestions)
    .slice(0, 5)
    .reduce((prev, curr, index) => {
      prev[curr.id] = {
        position: index + 1,
        question: curr,
      }

      return prev
    }, {} as Record<string, SegmentQuestion>),
}

export const mockSegment3: QuestionSegmentType = {
  id: 'seg-3',
  type: 'QUESTIONS',
  name: '3rd',
  position: 4,
  intro: {
    type: 'NONE',
  },
  questions: Object.values(mockQuestions)
    .slice(11, 20)
    .reduce((prev, curr, index) => {
      prev[curr.id] = {
        position: index + 1,
        question: curr,
      }

      return prev
    }, {} as Record<string, SegmentQuestion>),
}

const scoreSegment1: ScoreSegmentType = {
  id: 'score1',
  type: 'SCORES',
  name: 'Scores',
  position: 2,
}

const scoreSegment2: ScoreSegmentType = {
  id: 'score2',
  type: 'SCORES',
  name: 'Scores',
  position: 5,
}

export const mockShow1: Show = {
  id: '1',
  name: 'Ditt å Datt',
  segments: {
    [mockSegment1.id]: mockSegment1,
    [scoreSegment1.id]: scoreSegment1,
    [mockSegment2.id]: mockSegment2,
    [mockSegment3.id]: mockSegment3,
    [scoreSegment2.id]: scoreSegment2,
  },
}

export const mockShow2: Show = {
  id: '2',
  name: 'Alla mot Alla',
  segments: {},
}
