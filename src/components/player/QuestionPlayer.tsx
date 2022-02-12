import { useActor } from '@xstate/react'
import styled from 'styled-components'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionPlayerFactory } from './questionPlayers/QuestionPlayerFactory'
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
    <Wrapper>
      {enabled && (
        <QuestionTimer progress={(elapsed / duration) * 100}></QuestionTimer>
      )}
      <QuestionPlayerFactory
        question={question}
        machineState={state}
        timerState={timerState}
      ></QuestionPlayerFactory>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
`
