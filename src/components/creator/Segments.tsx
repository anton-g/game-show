import { ReactNode, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useAppState, useActions } from '../../overmind'
import { BoardSegment } from './BoardSegment/BoardSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShow: currentShow } = useAppState()
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
      {currentShow?.segments.map((segment, index) => (
        <BoardSegment
          key={segment.id}
          index={index}
          segment={segment}
          move={move}
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
