import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Segments } from './Segments'

export const Board = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Segments></Segments>
    </DndProvider>
  )
}
