import { useActor, useMachine } from '@xstate/react'
import styled from 'styled-components'
import {
  createQuestionMachine,
  QuestionActor,
  QuestionState,
} from '../../machines/questionMachine'
import { QuestionPlayerFactory } from './questionPlayers/QuestionPlayerFactory'
import { QuestionTimer } from './QuestionTimer'

export function ManualQuestionPlayer({
  machine,
}: {
  machine: ReturnType<typeof createQuestionMachine>
}) {
  const [state] = useMachine(machine, { devTools: true })

  return <InternalQuestionPlayer state={state} />
}

type QuestionPlayerProps = {
  machine: QuestionActor
}
export function QuestionPlayer({ machine }: QuestionPlayerProps) {
  const [state] = useActor(machine)

  return <InternalQuestionPlayer state={state} />
}

function InternalQuestionPlayer({ state }: { state: QuestionState }) {
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
