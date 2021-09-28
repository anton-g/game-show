import { ReactNode, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState, useActions } from '../../overmind'
import { Segment } from '../../overmind/state'
import { BoardSegment } from './BoardSegment/BoardSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShow: currentShow } = useAppState()
  const [, drop] = useDrop(() => ({
    accept: 'SEGMENT',
  }))

  const {
    reorderSegment,
    moveSegmentQuestion,
    reorderSegmentQuestion,
    findQuestion,
  } = useActions()

  // const move = useCallback(
  //   (id: string, toIndex: number) => {
  //     console.log(`Moving segment ${id} to idx ${toIndex}`)
  //     reorderSegment({
  //       segmentId: id,
  //       targetPosition: toIndex,
  //     })
  //   },
  //   [reorderSegment]
  // )

  const moveQuestion = useCallback(
    // TODO move to action
    (id: string, toPosition: number, toSegmentId: Segment['id']) => {
      const { question, segmentId } = findQuestion(id)

      if (segmentId === toSegmentId) {
        // console.log(
        //   `Reordering ${card.id} from ${card.position} to ${toPosition}`
        // );
        reorderSegmentQuestion({
          question,
          segmentId,
          fromPosition: question.position,
          toPosition,
        })
      } else {
        moveSegmentQuestion({
          question,
          fromSegmentId: segmentId,
          toSegmentId: toSegmentId,
          fromPosition: question.position,
          toPosition,
        })
      }
    },
    [findQuestion, reorderSegmentQuestion, moveSegmentQuestion]
  )

  if (!currentShow) return null // TODO render something?

  const segmentsList = Object.values(currentShow.segments)

  return (
    <Wrapper ref={drop}>
      {segmentsList.map((segment) => (
        <BoardSegment
          key={segment.id}
          segment={segment}
          moveQuestion={moveQuestion}
          findQuestion={findQuestion}
        ></BoardSegment>
      ))}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  > * {
    margin-left: 16px;
  }
`
