import { useActor } from '@xstate/react'
import styled from 'styled-components'
import { EmittedFrom } from 'xstate'
import { QuestionActor } from '../../machines/questionMachine'
import { TimerActor } from '../../machines/timerMachine'
import { ImageQuestion, Question, TextQuestion } from '../../overmind/types'
import { lerp } from '../../utils/number-utils'
import { QuestionTimer } from './QuestionTimer'

type QuestionPlayerProps = {
  machine: QuestionActor
}

export function QuestionPlayer({ machine }: QuestionPlayerProps) {
  const [state] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)
  const question = state.context.question

  const { enabled, elapsed, duration } = timerState.context

  return (
    <QuestionPlayerWrapper>
      {enabled && (
        <QuestionTimer progress={(elapsed / duration) * 100}></QuestionTimer>
      )}
      <QuestionPlayerFactory
        question={question}
        machineState={state}
        timerState={timerState}
      ></QuestionPlayerFactory>
    </QuestionPlayerWrapper>
  )
}

const QuestionPlayerWrapper = styled.div`
  height: 100%;
  width: 100%;
`

type QuestionPlayerFactoryProps = {
  question: Question
  machineState: EmittedFrom<QuestionActor>
  timerState: EmittedFrom<TimerActor>
}

function QuestionPlayerFactory({
  question,
  machineState,
  timerState,
}: QuestionPlayerFactoryProps) {
  switch (question.type) {
    case 'IMAGE':
      return (
        <ImageQuestionPlayer
          question={question}
          machineState={machineState}
          timerState={timerState}
        ></ImageQuestionPlayer>
      )
    case 'SOUND':
      return <div>sound</div>
    case 'TEXT':
      return (
        <TextQuestionPlayer
          question={question}
          machineState={machineState}
        ></TextQuestionPlayer>
      )
    case 'VIDEO':
      return <div>video</div>
    default:
      const _exhaustiveCheck: never = question
      return _exhaustiveCheck
  }
}

type TextQuestionPlayerProps = {
  question: TextQuestion
  machineState: EmittedFrom<QuestionActor>
}

function TextQuestionPlayer({
  question,
  machineState,
}: TextQuestionPlayerProps) {
  switch (machineState.value) {
    case 'intro':
      return null
    case 'idle':
    case 'buzzed':
    case 'waitingForReveal':
    case 'revealed':
      return <h3>{question.question}</h3>
    case 'ended':
    default:
      throw Error('Unhandled machine state')
  }
}

type ImageQuestionPlayerProps = {
  question: ImageQuestion
  machineState: EmittedFrom<QuestionActor>
  timerState: EmittedFrom<TimerActor>
}

function ImageQuestionPlayer({
  question,
  machineState,
  timerState,
}: ImageQuestionPlayerProps) {
  const { elapsed, duration } = timerState.context
  const progress = elapsed / duration

  switch (machineState.value) {
    case 'intro':
      return null
    case 'idle':
    case 'buzzed':
    case 'waitingForReveal':
    case 'revealed':
      return (
        <Wrapper>
          <BlurredImage
            blur={
              machineState.value === 'revealed'
                ? '0'
                : lerp(1, 0, progress) + 'em'
            }
            alt=""
            src={question.assets.imageSrc}
          />
        </Wrapper>
      )
    case 'ended':
    default:
      throw Error('Unhandled machine state')
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`

const BlurredImage = styled.img<{ blur: string }>`
  max-height: 100%;
  filter: ${({ blur }) => `blur(${blur})`};
`
