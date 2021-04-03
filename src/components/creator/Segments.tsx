import { ReactNode, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState, useActions } from '../../overmind'
import { DraggableSegment } from './DraggableSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { segments } = useAppState()
  const [, drop] = useDrop(() => ({
    accept: 'SEGMENT',
  }))

  const { reorderSegment } = useActions()

  const move = useCallback(
    (id: string, toIndex: number) => {
      console.log(`Moving segment ${id} to idx ${toIndex}`)
      reorderSegment({
        segmentId: id,
        targetPosition: toIndex,
      })
    },
    [reorderSegment]
  )

  return (
    <Wrapper ref={drop}>
      {segments.map((segment, index) => (
        <DraggableSegment
          key={segment.id}
          index={index}
          segment={segment}
          move={move}
        ></DraggableSegment>
      ))}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`
