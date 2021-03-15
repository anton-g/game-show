import React, { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions } from '../../overmind'
import type { Segment } from '../../overmind/state'
import { DraggableQuestion } from './DraggableQuestion2'

type Props = {
  segment: Segment
}

export const DraggableSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ segment }, ref) => {
    const [, drop] = useDrop(() => ({
      accept: 'QUESTION',
    }))
    const { reorderSegmentQuestion } = useActions()

    const findQuestion = useCallback(
      (id: string) => {
        const question = segment.questions.find((q) => q.id === id)
        return {
          question,
          index: segment.questions.findIndex((q) => q.id === id),
        }
      },
      [segment]
    )

    const move = useCallback(
      (id: string, toIndex: number) => {
        const { index } = findQuestion(id)
        console.log(`Moving ${id} from idx ${index} to idx ${toIndex}`)
        reorderSegmentQuestion({
          segmentId: segment.id,
          questionId: id,
          targetPosition: toIndex,
        })
      },
      [reorderSegmentQuestion, segment, findQuestion]
    )

    return (
      <Wrapper ref={ref}>
        <Header>
          <Title>{segment.name}</Title>
        </Header>
        <QuestionsList ref={drop}>
          {segment.questions.map((question, index) => (
            <DraggableQuestion
              key={question.id}
              question={question}
              move={move}
              index={index}
            />
          ))}
        </QuestionsList>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background-color: royalblue;
  margin-right: 16px;
  padding: 0 8px;
`

const Header = styled.div`
  padding: 32px 8px;
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
`

const QuestionsList = styled.div`
  height: 100%;
  background-color: palevioletred;
  min-width: 150px;
  overflow-y: scroll;
`
