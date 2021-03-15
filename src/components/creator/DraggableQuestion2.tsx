import { useDrag, useDrop } from 'react-dnd'
import { useAppState } from '../../overmind'
import type { Question } from '../../overmind/state'

export function DraggableQuestion({
  question,
  index,
  move,
}: {
  question: Question
  index: number
  move: (id: string, toIndex: number) => void
}) {
  useAppState()

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'QUESTION',
      item: { id: question.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id, index } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          move(id, index)
        }
      },
    }),
    [question, index, move]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'QUESTION',
      canDrop: () => false,
      hover({ id: draggedId }: any) {
        if (draggedId !== question.id) {
          move(draggedId, index)
        }
      },
    }),
    [question, move]
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: 8,
        cursor: 'move',
        backgroundColor: 'white',
        border: '1px dashed deeppink',
        opacity: isDragging ? 0 : 1,
      }}
    >
      {question.question}
    </div>
  )
}
