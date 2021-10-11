import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { BoardSegment } from './boardSegment/BoardSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShowSegmentsList } = useAppState()
  const [, drop] = useDrop(() => ({
    accept: 'SEGMENT',
  }))

  return (
    <Wrapper ref={drop}>
      {selectedShowSegmentsList.map((segment) => (
        <BoardSegment key={segment.id} segmentId={segment.id}></BoardSegment>
      ))}
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
