import { useSortable } from '@dnd-kit/sortable'
import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Question, QuestionSegmentType } from '../../../overmind/types'
import { getQuestionAnswer } from '../../../utils/question-utils'
import { isQuestionSegment } from '../../../utils/type-utils'
import { DraggedQuestion, DRAG_TYPES } from '../Board'
import { BoardQuestion } from './BoardQuestion'
import { QuestionOptions } from './QuestionOptions'

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
    over,
    overIndex,
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
