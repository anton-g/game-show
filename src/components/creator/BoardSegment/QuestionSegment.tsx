import { useState } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { QuestionSegmentType } from '../../../overmind/types'
import { SegmentOptions } from './SegmentOptions'
import { DraggedQuestion, DRAG_TYPES } from '../Board'
import { BoardQuestion } from '../boardQuestion/BoardQuestion'
import { QuestionPicker } from '../questionPicker/QuestionPicker'
import { EditSegmentDialog } from './EditSegmentDialog'
import { isQuestionSegment } from '../../../utils/type-utils'
import { useSegmentDrag } from './useSegmentDrag'
import { useSegmentDrop } from './useSegmentDrop'

type Props = {
  segmentId: QuestionSegmentType['id']
}

export const QuestionSegment = ({ segmentId }: Props) => {
  const [editing, setEditing] = useState(false)

  const {
    removeSegment,
    findQuestion,
    moveOrReorderQuestion,
    addSegmentQuestion,
  } = useActions().builder
  const segment = useAppState(
    (state) => state.selectedShow!.segments[segmentId]
  )

  if (!isQuestionSegment(segment)) throw new Error('Invalid segment')

  const questionsList = Object.values(segment.questions).sort(
    (a, b) => a.position - b.position
  )

  const [segmentDragSource, preview, { isDragging }] = useSegmentDrag(
    segmentId,
    segment.position
  )

  const [segmentDropTarget] = useSegmentDrop(segmentId)

  const [, questionDropArea] = useDrop(
    () => ({
      accept: DRAG_TYPES.QUESTION,
      hover({ id: draggedId }: DraggedQuestion) {
        const { segmentId } = findQuestion(draggedId)
        if (segmentId === segment.id) return

        moveOrReorderQuestion({
          id: draggedId,
          toPosition: Object.values(segment.questions).length + 1,
          toSegmentId: segment.id,
        })
      },
    }),
    [segment.questions, segment.id, moveOrReorderQuestion]
  )

  return (
    <Wrapper
      dragging={isDragging}
      ref={(node) => preview(segmentDropTarget(node))}
    >
      <Header ref={segmentDragSource}>
        <TitleRow>
          <Title>{segment.name}</Title>
          <StyledOptions
            onRemove={() => {
              if (
                Object.values(segment.questions).length === 0 ||
                window.confirm('Are you sure?')
              ) {
                removeSegment(segment.id)
              }
            }}
            onEdit={() => setEditing(true)}
          ></StyledOptions>
        </TitleRow>
      </Header>
      <QuestionsList ref={questionDropArea}>
        {questionsList.map((question) => (
          <BoardQuestion
            key={question.question.id}
            questionId={question.question.id}
            segmentId={segmentId}
          />
        ))}
        <QuestionPicker
          segmentName={segment.name}
          onSelect={(questionId) =>
            addSegmentQuestion({ segmentId: segment.id, questionId })
          }
        ></QuestionPicker>
      </QuestionsList>
      <EditSegmentDialog
        open={editing}
        onOpenChange={setEditing}
        segment={segment}
      />
    </Wrapper>
  )
}

const StyledOptions = styled(SegmentOptions)``

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  padding: 0 8px 8px;
  opacity: ${(p) => (p.dragging ? 0 : 1)};

  ${StyledOptions} {
    visibility: hidden;
  }

  &:hover {
    ${StyledOptions} {
      visibility: visible;
    }
  }
`

const Header = styled.div`
  padding: 16px 8px;
  cursor: move;
  min-height: 60px;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  width: 100%;
  font-size: 24px;
`

const QuestionsList = styled.div`
  height: 100%;
  border-radius: 8px;
  min-width: 150px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.gray3};
  padding: 16px;

  > *:not(:last-child) {
    margin-bottom: 16px;
  }
`
