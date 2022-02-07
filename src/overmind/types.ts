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

type QuestionSettings = {
  timeLimit: number
}

type BaseQuestion = {
  id: string
  question: string
  lore?: string
  answer: Answer
  scoring: Scoring
  settings: QuestionSettings
}

export type TextQuestion = {
  type: 'TEXT'
} & BaseQuestion

export type SoundQuestion = {
  type: 'SOUND'
} & BaseQuestion

export type ImageQuestion = {
  type: 'IMAGE'
  assets: {
    imageSrc: string
  }
} & BaseQuestion

export type VideoQuestion = {
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

type SegmentType = 'QUESTIONS' | 'SCORES'

type BaseSegment = {
  id: string
  position: number
  name: string
  type: SegmentType
}

export type QuestionSegmentType = {
  type: 'QUESTIONS'
  intro: Intro
  questions: Record<Question['id'], SegmentQuestion>
} & BaseSegment

export type ScoreSegmentType = {
  type: 'SCORES'
  name: 'Scores'
} & BaseSegment

export type Segment = QuestionSegmentType | ScoreSegmentType

export type Show = {
  id: string
  name: string
  segments: Record<Segment['id'], Segment>
}
