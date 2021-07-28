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
      {/* <Drawer></Drawer> */}
    </DndProvider>
  )
}

function SegmentPlaceholder() {
  const { addSegment } = useActions()

  return (
    <Wrapper>
      <MockSegmentButton onClick={addSegment}>New segment</MockSegmentButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 300px;
  padding-right: 60px;
  padding-top: 20px;
`

const MockSegmentButton = styled.button`
  background: none;
  border: 2px dashed hsl(0 0% 90%);
  color: hsl(0 0% 40%);
  border-radius: 8px;
  font-size: 20px;
  padding: 8px 16px;
  text-align: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: hsl(0 0% 98%);
    border-color: hsl(0 0% 80%);
  }
`
