import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { useActions } from '../../overmind'
import { Drawer } from './Drawer'
import { Segments } from './Segments'

export const Board = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Segments>
        <SegmentPlaceholder></SegmentPlaceholder>
      </Segments>
      <Drawer></Drawer>
    </DndProvider>
  )
}

function SegmentPlaceholder() {
  const { addSegment } = useActions()

  return (
    <div
      style={{
        minWidth: 300,
        paddingRight: 60,
        paddingTop: 20,
      }}
    >
      <MockSegmentButton onClick={addSegment}>New segment</MockSegmentButton>
    </div>
  )
}

const MockSegmentButton = styled.button`
  background: none;
  border: 2px dashed hsl(0 0% 50%);
  border-radius: 8px;
  font-size: 20px;
  padding: 8px 16px;
  text-align: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: hsl(0 0% 90%);
  }
`
