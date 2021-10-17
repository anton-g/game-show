import { useState } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useActions, useAppState } from '../../../overmind'
import type { QuestionSegmentType } from '../../../overmind/types'
import { SegmentOptions } from './SegmentOptions'
import { DraggedQuestion, DRAG_TYPES } from '../Board'
import { BoardQuestion } from '../boardQuestion/BoardQuestion'
import { QuestionPicker } from '../questionPicker/QuestionPicker'
import { EditSegmentDialog } from './EditSegmentDialog'
import { isQuestionSegment } from '../../../utils/type-utils'

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

  const questionsList = Object.values(segment.questions)
    .sort((a, b) => a.position - b.position)
    .map((x) => x.question)

  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id: segmentId,
    data: {
      type: DRAG_TYPES.SEGMENT,
    },
    // animateLayoutChanges,
  })

  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <Wrapper dragging={isDragging} ref={setNodeRef} style={style}>
      <Header {...attributes} {...listeners}>
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
      <QuestionsList
      // ref={questionDropArea}
      >
        <SortableContext
          items={questionsList}
          strategy={verticalListSortingStrategy}
        >
          {questionsList.map((question) => (
            <BoardQuestion
              key={question.id}
              questionId={question.id}
              segmentId={segmentId}
            />
          ))}
          {/* {items[containerId].map((value, index) => {
            return (
              <SortableItem
                disabled={isSortingContainer}
                key={value}
                id={value}
                index={index}
                handle={handle}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                renderItem={renderItem}
                containerId={containerId}
                getIndex={getIndex}
              />
            )
          })} */}
        </SortableContext>
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
  opacity: ${(p) => (p.dragging ? 0.5 : 1)};

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
