import {
  Question,
  QuestionSegmentType,
  ScoreSegmentType,
  SegmentQuestion,
  Show,
} from './types'

export const mockQuestions: Record<Question['id'], Question> = {
  '1': {
    id: '1',
    type: 'TEXT',
    question: `What's the song name?`,
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
    question: `What's the song name?`,
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
    question: `Who's this?`,
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
  },
  '5': {
    id: '5',
    type: 'TEXT',
    question: `What's the song name?`,
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
  },
  '7': {
    id: '7',
    type: 'IMAGE',
    question: `Who's this?`,
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
  },
  '9': {
    id: '9',
    type: 'VIDEO',
    question: 'What happens next?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'Martin Eriksson shows up from nowhere.',
    },
    scoring: {
      value: 5,
    },
  },
  '10': {
    id: '10',
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
  },
  '11': {
    id: '11',
    type: 'TEXT',
    question: `What's the artist name?`,
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
    question: `What's E-Type real name?`,
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
    question: 'How many lingonberries are there in the world?',
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
  },
  '15': {
    id: '15',
    type: 'TEXT',
    question: `What's your name?`,
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
  },
  '17': {
    id: '17',
    type: 'IMAGE',
    question: `Who isn't this?`,
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
  },
  '19': {
    id: '19',
    type: 'VIDEO',
    question: 'What happened before?',
    answer: {
      type: 'BUZZ_SINGLE',
      value: 'De såg Martin Eriksson.',
    },
    scoring: {
      value: 5,
    },
  },
}

export const mockSegment1: QuestionSegmentType = {
  id: 'seg-1',
  type: 'QUESTIONS',
  name: 'First',
  position: 4,
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
  position: 1,
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
  position: 2,
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
  position: 3,
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
    [mockSegment2.id]: mockSegment2,
    [mockSegment1.id]: mockSegment1,
    [mockSegment3.id]: mockSegment3,
    [scoreSegment1.id]: scoreSegment1,
    [scoreSegment2.id]: scoreSegment2,
  },
}

export const mockShow2: Show = {
  id: '2',
  name: 'Alla mot Alla',
  segments: {},
}
