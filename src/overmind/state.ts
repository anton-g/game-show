import { derived } from 'overmind'
import { mockSegment1, mockSegment2 } from './mocks'

type AnswerType =
  | 'BUZZ_SINGLE'
  | 'OPTIONS_SINGLE'
  | 'OPTIONS_MULTI'
  | 'PHYSICAL'

type Answer = {
  type: AnswerType
  value: string
}

type BaseQuestion = {
  id: string
  answer: Answer
}

type TextQuestion = {
  type: 'TEXT'
  question: string
} & BaseQuestion

type SoundQuestion = {
  type: 'SOUND'
} & BaseQuestion

type Question = TextQuestion | SoundQuestion

type IntroType = 'VIDEO' | 'COMPONENT'

type Intro = {
  type: IntroType
  src: string
}

export type Segment = {
  id: string
  name: string
  intro: Intro
  questions: Question[]
}

type State = {
  segments: Segment[]
  currentSegmentIndex: number
  segment: Segment | null
}

export const state: State = {
  segments: [mockSegment1, mockSegment2],
  currentSegmentIndex: -1,
  segment: derived((state: State) => state.segments[state.currentSegmentIndex]),
}
