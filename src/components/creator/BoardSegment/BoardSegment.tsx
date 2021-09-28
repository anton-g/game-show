import { PlusCircledIcon } from '@radix-ui/react-icons'
import React, { useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Segment, SegmentQuestion } from '../../../overmind/state'
import { Spacer } from '../../common/Spacer'
import { DraggedQuestion } from '../Board'
import { BoardQuestion } from '../BoardQuestion/BoardQuestion'
import { SegmentOptions } from './SegmentOptions'

type Props = {
  segment: Segment
  findQuestion: (id: string) => {
    question: SegmentQuestion
    segmentId: Segment['id']
  } // TODO get from actions?
  moveQuestion: (
    id: string,
    toPosition: number,
    toSegmentId: Segment['id']
  ) => void // TODO get from actions?
}

export const BoardSegment = ({
  segment,
  findQuestion,
  moveQuestion,
}: Props) => {
  useAppState()
  const [editing, setEditing] = useState(false)
  const { removeSegment, updateSegment } = useActions()

  const [, drop] = useDrop(
    () => ({
      accept: 'QUESTION',
      hover({ id: draggedId }: DraggedQuestion) {
        const { segmentId } = findQuestion(draggedId)
        if (segmentId === segment.id) return

        moveQuestion(
          draggedId,
          Object.values(segment.questions).length + 1,
          segment.id
        )
      },
    }),
    [segment.questions, segment.id, moveQuestion]
  )

  const questionsList = Object.values(segment.questions).sort(
    (a, b) => a.position - b.position
  )
  return (
    <Wrapper
      dragging={false}
      ref={drop}
      // ref={(node) => preview(segmentDropTarget(node))}
    >
      {/* <Header ref={segmentDragSource}> */}
      <Header>
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
      {/* <QuestionsList ref={questionDropArea}> */}
      <QuestionsList>
        {questionsList.map((question) => (
          <BoardQuestion
            key={question.question.id}
            questionId={question.question.id}
            moveQuestion={moveQuestion}
            findQuestion={findQuestion}
            // reorder={reorderQuestion}
            // index={index}
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
