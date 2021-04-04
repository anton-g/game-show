import { useCallback, useState } from 'react'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { useActions, useAppState } from '../../overmind'
import type { Question, Segment } from '../../overmind/state'
import { DropdownMenu } from '../common/DropdownMenu'
import { useQuestionDrag } from './useQuestionDrag'
import { useQuestionDrop } from './useQuestionDrop'

type Props = {
  question: Question
  segmentId: string | null
  index: number
  move: (
    id: string,
    fromSegmentId: string | null,
    toSegmentId: string | null,
    toIndex?: number
  ) => void
  reorder: (id: string, segmentId: string, toIndex: number) => void
}

export function BoardQuestion({
  question,
  index,
  segmentId,
  move,
  reorder,
}: Props) {
  const [showMoveDialog, setShowMoveDialog] = useState(false)
  const { segments } = useAppState()
  const {
    getQuestionSegment,
    removeSegmentQuestion,
    moveSegmentQuestion,
  } = useActions()

  const [isDragging, drag] = useQuestionDrag(question.id, {
    onMove: useCallback(
      (id, targetSegmentId) => {
        move(id, segmentId, targetSegmentId)
      },
      [move, segmentId]
    ),
    onReorder: useCallback(
      (id, fromSegmentId) => {
        reorder(id, fromSegmentId, index)
      },
      [index, reorder]
    ),
  })

  const drop = useQuestionDrop(
    segmentId,
    {
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId === question.id) return // Hovering itself

        const draggedFromSegment = getQuestionSegment(draggedId)
        if (!draggedFromSegment) {
          move(draggedId, null, segmentId, index)
          return
        }

        if (segmentId === draggedFromSegment.id) {
          reorder(draggedId, draggedFromSegment.id, index)
        } else {
          move(draggedId, draggedFromSegment.id, segmentId, index)
        }
      },
    },
    [question, index, move]
  )

  return (
    <Wrapper ref={(node) => drag(drop(node))} isDragging={isDragging}>
      <Header>
        <span>{question.question}</span>
        <QuestionOptions
          onRemove={() =>
            removeSegmentQuestion({
              segmentId: segmentId!,
              questionId: question.id,
            })
          }
          onMove={() => setShowMoveDialog(true)}
        ></QuestionOptions>
      </Header>
      <p>
        {segmentId} - {index}
      </p>
      <QuestionMoveDialog
        open={showMoveDialog}
        segments={segments.filter((x) => x.id !== segmentId)}
        onOpenChange={setShowMoveDialog}
        onSelectedSegment={(targetSegmentId) =>
          moveSegmentQuestion({
            fromSegmentId: segmentId,
            toSegmentId: targetSegmentId,
            questionId: question.id,
          })
        }
      ></QuestionMoveDialog>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isDragging: boolean }>`
  padding: 8px;
  cursor: move;
  background-color: white;
  border: 1px dashed hsl(0 0% 70%);
  opacity: ${(p) => (p.isDragging ? 0.1 : 1)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

type DialogProps = {
  open: boolean
  segments: Segment[]
  onOpenChange: (open: boolean) => void
  onSelectedSegment: (segmentId: string) => void
}
function QuestionMoveDialog({
  open,
  segments,
  onOpenChange,
  onSelectedSegment,
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <StyledOverlay />
      <StyledContent>
        <Title>Select segment</Title>
        {segments.map((segment) => (
          <SegmentButton onClick={() => onSelectedSegment(segment.id)}>
            {segment.name}
          </SegmentButton>
        ))}
        <Dialog.Close>Close</Dialog.Close>
      </StyledContent>
    </Dialog.Root>
  )
}

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: hsl(0 0% 0% / 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: fit-content;
  max-height: 85vh;
  margin-top: -5vh;
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 8px 4px;
  &:focus {
    outline: none;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  padding: 8px 2px;
`

const SegmentButton = styled.button`
  padding: 8px 4px;
  background: none;
  border: 0;
  border-radius: 4px;
  text-align: left;
  font-size: 16px;
  &:hover {
    background-color: dodgerblue;
    color: white;
  }
`

type OptionsProps = {
  onMove: () => void
  onRemove: () => void
}
function QuestionOptions({ onMove, onRemove }: OptionsProps) {
  return (
    <DropdownMenu>
      <Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onMove}>Move</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={onRemove}>Remove</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const Trigger = styled(DropdownMenu.Trigger)`
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
`
