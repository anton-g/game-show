import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { QuestionSegment } from './boardSegment/QuestionSegment'
import { ScoreSegment } from './boardSegment/ScoreSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShowSegmentsList } = useAppState()
  const [, drop] = useDrop(() => ({
    accept: 'SEGMENT',
  }))

  return (
    <Wrapper ref={drop}>
      {selectedShowSegmentsList.map((segment) => {
        switch (segment.type) {
          case 'QUESTIONS':
            return (
              <QuestionSegment
                key={segment.id}
                segmentId={segment.id}
              ></QuestionSegment>
            )
          case 'SCORES':
            return (
              <ScoreSegment
                key={segment.id}
                segmentId={segment.id}
              ></ScoreSegment>
            )
          default:
            const _exhaustiveCheck: never = segment
            return _exhaustiveCheck
        }
      })}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  overflow-x: scroll;

  > * {
    margin-left: 16px;
  }
`
