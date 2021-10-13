// TODO use null instead of undefined/?

export type AnswerType =
  | 'BUZZ_SINGLE'
  | 'OPTIONS_SINGLE'
  | 'OPTIONS_MULTI'
  | 'PHYSICAL'

type BaseAnswer = {
  type: AnswerType
}

type SingleBuzzAnswer = {
  type: 'BUZZ_SINGLE'
  value: string
}

type PhysicalAnswer = {
  type: 'PHYSICAL'
  value: string
}

type OptionsAnswerOptions = {
  a: string
  b: string
  c?: string
  d?: string
}

type OptionsAnswer = {
  type: 'OPTIONS_SINGLE'
  options: OptionsAnswerOptions
  correctOption: keyof OptionsAnswerOptions
}

type Answer = BaseAnswer & (SingleBuzzAnswer | OptionsAnswer | PhysicalAnswer)

type Scoring = {
  value: number
}

type BaseQuestion = {
  id: string
  question: string
  lore?: string
  answer: Answer
  scoring: Scoring
}

type TextQuestion = {
  type: 'TEXT'
} & BaseQuestion

type SoundQuestion = {
  type: 'SOUND'
} & BaseQuestion

type ImageQuestion = {
  type: 'IMAGE'
} & BaseQuestion

type VideoQuestion = {
  type: 'VIDEO'
} & BaseQuestion

export type Question =
  | TextQuestion
  | SoundQuestion
  | ImageQuestion
  | VideoQuestion

type IntroType = 'NONE' | 'COMPONENT'

type IntroBase = {
  type: IntroType
}

type ComponentIntro = {
  type: 'COMPONENT'
  src: string
} & IntroBase

type NoIntro = {
  type: 'NONE'
} & IntroBase

type Intro = ComponentIntro | NoIntro

export type SegmentQuestion = {
  question: Question
  position: number
}

export type Segment = {
  id: string
  name: string
  intro: Intro
  questions: Record<Question['id'], SegmentQuestion>
  position: number
}

export type Show = {
  id: string
  name: string
  segments: Record<Segment['id'], Segment>
}
