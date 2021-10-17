import React, { useState } from 'react'
import styled from 'styled-components'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useActions, useAppState } from '../../../overmind'
import type { QuestionSegmentType } from '../../../overmind/types'
import { SegmentOptions } from './SegmentOptions'
import { QuestionPicker } from '../questionPicker/QuestionPicker'
import { EditSegmentDialog } from './EditSegmentDialog'
import { isQuestionSegment } from '../../../utils/type-utils'
import { SortableBoardQuestion } from '../boardQuestion/SortableBoardQuestion'

type Props = {
  segmentId: QuestionSegmentType['id']
  isSortingContainer: boolean
  isDragging: boolean
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
}

export const QuestionSegment = ({
  segmentId,
  isSortingContainer,
  isDragging,
  setNodeRef,
  style,
  handleProps,
}: Props) => {
  const [editing, setEditing] = useState(false)

  const { removeSegment, addSegmentQuestion } = useActions().builder
  const segment = useAppState(
    (state) => state.selectedShow!.segments[segmentId]
  )

  if (!isQuestionSegment(segment)) throw new Error('Invalid segment')

  const questionsList = Object.values(segment.questions)
    .sort((a, b) => a.position - b.position)
    .map((x) => x.question)

  return (
    <Wrapper dragging={isDragging} ref={setNodeRef} style={style}>
      <Header {...handleProps}>
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
      <QuestionsList>
        <SortableContext
          items={questionsList}
          strategy={verticalListSortingStrategy}
        >
          {questionsList.map((question) => (
            <SortableBoardQuestion
              key={question.id}
              id={question.id}
              segmentId={segmentId}
              disabled={isSortingContainer}
            />
          ))}
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
