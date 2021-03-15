import styled from 'styled-components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DraggableSegment } from '../../components/creator/DraggableSegment2'
import { useAppState } from '../../overmind'

export const Board = () => {
  const { segments } = useAppState()

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <DraggableSegment segment={segments[0]}></DraggableSegment>
      </Wrapper>
    </DndProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`
