import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Drawer } from './Drawer'
import { Segments } from './Segments'

export const Board = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Segments>
        <div
          style={{
            minWidth: 300,
          }}
        ></div>
      </Segments>
      <Drawer></Drawer>
    </DndProvider>
  )
}
