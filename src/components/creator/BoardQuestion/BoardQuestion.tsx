import { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useActions } from '../../../overmind'
import type { Question } from '../../../overmind/state'
import { getQuestionAnswer } from '../../../utils/question-utils'
import { useQuestionDrag } from '../useQuestionDrag'
import { useQuestionDrop } from '../useQuestionDrop'
import { QuestionOptions } from './QuestionOptions'

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
  reorder?: (id: string, segmentId: string, toIndex: number) => void
}

export function BoardQuestion({
  question,
  index,
  segmentId,
  move,
  reorder,
}: Props) {
  const { getQuestionSegment, removeSegmentQuestion, moveSegmentQuestion } =
    useActions()

  const [isDragging, drag] = useQuestionDrag(question.id, {
    onMove: useCallback(
      (id, targetSegmentId) => {
        move(id, segmentId, targetSegmentId)
      },
      [move, segmentId]
    ),
    onReorder: useCallback(
      (id, fromSegmentId) => {
        reorder && reorder(id, fromSegmentId, index)
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
          reorder && reorder(draggedId, draggedFromSegment.id, index)
        } else {
          move(draggedId, draggedFromSegment.id, segmentId, index)
        }
      },
    },
    [question, index, move]
  )

  return (
    <Wrapper ref={(node) => drag(drop(node))} hideShadow={isDragging}>
      {isDragging && <TargetDropArea />}
      <Content type={question.type}>
        <Header>
          <QuestionTitle>{question.question}</QuestionTitle>
          <StyledOptions
            questionId={question.id}
            activeSegmentId={segmentId}
            onRemove={() =>
              removeSegmentQuestion({
                segmentId: segmentId!,
                questionId: question.id,
              })
            }
            onMove={(targetSegmentId) =>
              moveSegmentQuestion({
                fromSegmentId: segmentId,
                toSegmentId: targetSegmentId,
                questionId: question.id,
              })
            }
          ></StyledOptions>
        </Header>
        <p>{getQuestionAnswer(question)}</p>
      </Content>
    </Wrapper>
  )
}

const Content = styled.div<{ type: Question['type'] }>`
  border-radius: 8px;
  border-top: 4px solid ${({ theme, type }) => theme.colors.types[type]};
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 8px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledOptions = styled(QuestionOptions)``

const Wrapper = styled.div<{ hideShadow: boolean }>`
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  ${({ hideShadow }) =>
    !hideShadow &&
    css`
      box-shadow: 0 1px 3px hsl(0 0% 0% / 0.2);
    `}

  ${StyledOptions} {
    visibility: hidden;
  }

  &:hover {
    ${StyledOptions} {
      visibility: visible;
    }
  }
`

const QuestionTitle = styled.span`
  font-weight: bold;
`

const TargetDropArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.gray1};
  background-size: 10px 10px;
  background-image: repeating-linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.gray3} 0,
    ${({ theme }) => theme.colors.gray3} 2px,
    ${({ theme }) => theme.colors.gray1} 0,
    ${({ theme }) => theme.colors.gray1} 50%
  );
`
