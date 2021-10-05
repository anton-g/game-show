import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Segment } from '../../../overmind/state'
import { Spacer } from '../../common/Spacer'
import { DraggedQuestion, DraggedSegment, DRAG_TYPES } from '../Board'
import { BoardQuestion } from '../BoardQuestion/BoardQuestion'
import { SegmentOptions } from './SegmentOptions'

type Props = {
  segmentId: Segment['id']
}

export const BoardSegment = ({ segmentId }: Props) => {
  const [editing, setEditing] = useState(false)
  const {
    removeSegment,
    updateSegment,
    findQuestion,
    moveOrReorderQuestion,
    reorderSegment,
    findSegment,
  } = useActions()
  const segment = useAppState(
    (state) => state.selectedShow!.segments[segmentId]
  )
  const questionsList = Object.values(segment.questions).sort(
    (a, b) => a.position - b.position
  )

  const [{ isDragging }, segmentDragSource, preview] = useDrag(
    () => ({
      type: DRAG_TYPES.SEGMENT,
      item: {
        id: segmentId,
        originalPosition: segment.position,
      } as DraggedSegment,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalPosition } = item
        const didDrop = monitor.didDrop()

        if (!didDrop) {
          // "Cancel", dropped outside, move back to original position
          // TEST Does this work?
          reorderSegment({
            segmentId: droppedId,
            toPosition: originalPosition,
          })
        }
      },
      isDragging: (monitor) => {
        return segmentId === monitor.getItem().id
      },
    }),
    [segmentId, reorderSegment]
  )

  const [, segmentDropTarget] = useDrop(
    () => ({
      accept: DRAG_TYPES.SEGMENT,
      canDrop: () => false,
      hover({ id: draggedId }: DraggedSegment) {
        if (draggedId !== segment.id) {
          const { segment: hoveredSegment } = findSegment(segmentId) // TODO check if this can be removed?
          reorderSegment({
            segmentId: draggedId,
            toPosition: hoveredSegment.position,
          })
        }
      },
    }),
    [reorderSegment, segmentId]
  )

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
          {editing ? (
            <TitleInput
              defaultValue={segment.name}
              onChange={(name) => {
                updateSegment({ name, id: segment.id })
                setEditing(false)
              }}
            ></TitleInput>
          ) : (
            <Title onClick={() => setEditing(true)}>{segment.name}</Title>
          )}
          <StyledOptions
            onRemove={() => {
              if (
                Object.values(segment.questions).length === 0 ||
                window.confirm('Are you sure?')
              ) {
                removeSegment(segment.id)
              }
            }}
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
        <BoardNewQuestion></BoardNewQuestion>
      </QuestionsList>
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
  cursor: pointer;
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

type TitleProps = {
  onChange: (value: string) => void
  defaultValue: string
}
function TitleInput({ onChange, defaultValue }: TitleProps) {
  return (
    <Input
      autoFocus
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        switch (e.code) {
          case 'Enter':
            onChange(e.currentTarget.value || defaultValue)
            break
          case 'Escape':
            onChange(defaultValue)
            break
        }
      }}
      onFocus={(e) => e.target.select()}
      onBlur={(e) => {
        onChange(e.target.value || defaultValue)
      }}
    ></Input>
  )
}

const Input = styled.input`
  margin: 0;
  padding: 0;
  padding-left: 4px;
  margin-left: -5px;
  margin-top: -3px;
  margin-bottom: -3px;
  width: 100%;
  max-width: 100%;
  height: 32px;
  font-size: 24px;
  border-radius: 4px;
  border: 1px solid hsl(0 0% 90%);
  font-weight: bold;

  margin-right: 16px;
`

function BoardNewQuestion() {
  return (
    <NewWrapper>
      <PlusCircledIcon></PlusCircledIcon>
      <Spacer axis="horizontal" size={4}></Spacer>
      Add question
    </NewWrapper>
  )
}

const NewWrapper = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.gray11};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary2};
    border-color: ${({ theme }) => theme.colors.primary7};
    color: ${({ theme }) => theme.colors.primary11};
  }
`
