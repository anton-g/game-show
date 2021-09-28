import { ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { BoardSegment } from './BoardSegment/BoardSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShow: currentShow } = useAppState()
  const [, drop] = useDrop(() => ({
    accept: 'SEGMENT',
  }))

  if (!currentShow) return null // TODO render something?

  const segmentsList = Object.values(currentShow.segments)

  return (
    <Wrapper ref={drop}>
      {segmentsList.map((segment) => (
        <BoardSegment key={segment.id} segment={segment}></BoardSegment>
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
