import { useSortable } from '@dnd-kit/sortable'
import type { Question, QuestionSegmentType } from '../../overmind/types'
import { BoardQuestion } from './BoardQuestion'

type Props = {
  id: Question['id']
  segmentId: QuestionSegmentType['id']
  disabled: boolean
}

export function SortableBoardQuestion({
  id: questionId,
  segmentId,
  disabled,
}: Props) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id: questionId,
  })

  return (
    <BoardQuestion
      disabled={disabled}
      id={questionId}
      segmentId={segmentId}
      isDragging={isDragging}
      isSorting={isSorting}
      listeners={listeners}
      setNodeRef={setNodeRef}
      transition={transition}
      transform={transform}
    ></BoardQuestion>
  )
}
