import { useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Segment } from '../../../overmind/state'
import { BoardQuestion } from '../BoardQuestion/BoardQuestion'
import { useQuestionDrop } from '../useQuestionDrop'
import { SegmentOptions } from './SegmentOptions'

type Props = {
  segment: Segment
  index: number
  move: (segmentId: string, toIndex: number) => void
}

export const BoardSegment = ({ segment, index, move }: Props) => {
  const [editing, setEditing] = useState(false)
  useAppState()
  const {
    reorderSegmentQuestion,
    moveSegmentQuestion,
    getQuestionSegment,
    addSegmentQuestion,
    removeSegment,
    updateSegment,
  } = useActions()
  const questionDropArea = useQuestionDrop(
    segment.id,
    {
      hover({ id: draggedId }) {
        const draggedFromSegment = getQuestionSegment(draggedId)
        if (!draggedFromSegment) {
          addSegmentQuestion({
            segmentId: segment.id,
            questionId: draggedId,
          })
          return
        }

        if (segment.id === draggedFromSegment.id) {
          return
        }

        moveQuestion(
          draggedId,
          draggedFromSegment.id,
          segment.id,
          segment.questions.length
        )
      },
    },
    [segment]
  )

  const [{ isDragging }, segmentDragSource, preview] = useDrag(
    () => ({
      type: 'SEGMENT',
      item: { id: segment.id, index },
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
    [segment, index, move]
  )

  const [, segmentDropTarget] = useDrop(
    () => ({
      accept: 'SEGMENT',
      canDrop: () => false,
      hover({ id: draggedId }: any) {
        if (draggedId !== segment.id) {
          move(draggedId, index)
        }
      },
    }),
    [segment, move]
  )

  const moveQuestion = useCallback(
    (
      id: string,
      fromSegmentId: string | null,
      toSegmentId: string | null,
      toIndex?: number
    ) =>
      moveSegmentQuestion({
        fromSegmentId: fromSegmentId,
        toSegmentId: toSegmentId,
        questionId: id,
        toIndex,
      }),
    [moveSegmentQuestion]
  )

  const reorderQuestion = useCallback(
    (id: string, segmentId: string, toIndex: number) =>
      reorderSegmentQuestion({
        segmentId: segmentId,
        questionId: id,
        targetPosition: toIndex,
      }),
    [reorderSegmentQuestion]
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
          <SegmentOptions
            onRemove={() => {
              if (
                segment.questions.length === 0 ||
                window.confirm('Are you sure?')
              ) {
                removeSegment(segment.id)
              }
            }}
          ></SegmentOptions>
        </TitleRow>
      </Header>
      <QuestionsList ref={questionDropArea}>
        {segment.questions.map((question, index) => (
          <BoardQuestion
            key={question.id}
            question={question}
            segmentId={segment.id}
            move={moveQuestion}
            reorder={reorderQuestion}
            index={index}
          />
        ))}
        <BoardNewQuestion></BoardNewQuestion>
      </QuestionsList>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  background-color: hsl(0, 0%, 90%);
  padding: 0 8px 8px;
  opacity: ${(p) => (p.dragging ? 0 : 1)};
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
  border: 2px dashed hsl(0, 0%, 80%);
  border-radius: 8px;
  min-width: 150px;
  overflow-y: scroll;

  > *:not(:last-child) {
    margin-bottom: 8px;
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
  return <NewWrapper>Add question</NewWrapper>
}

const NewWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.gray12};
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray2};
  }
`
