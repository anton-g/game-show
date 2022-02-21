import styled from 'styled-components'
import { EmittedFrom } from 'xstate'
import { QuestionState } from '../../../machines/questionMachine'
import { TimerActor } from '../../../machines/timerMachine'
import { ImageQuestion } from '../../../overmind/types'
import { lerp } from '../../../utils/number-utils'

type ImageQuestionPlayerProps = {
  question: ImageQuestion
  machineState: QuestionState
  timerState: EmittedFrom<TimerActor>
}

export function ImageQuestionPlayer({
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
