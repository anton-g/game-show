import styled, { css } from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import type { Question, QuestionSegmentType } from '../../overmind/types'
import { getQuestionAnswer } from '../../utils/question-utils'
import { isQuestionSegment } from '../../utils/type-utils'
import { QuestionOptions } from './QuestionOptions'
import type { Transform } from '@dnd-kit/utilities'
import { DraggableSyntheticListeners } from '@dnd-kit/core'

type Props = {
  id: Question['id']
  segmentId: QuestionSegmentType['id']
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  style?: React.CSSProperties
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  transition?: string
  disabled?: boolean
  isDragging?: boolean
  isSorting?: boolean
  isDragOverlay?: boolean
}

export function BoardQuestion({
  id: questionId,
  segmentId,
  disabled,
  setNodeRef,
  transform,
  transition,
  listeners,
  isDragging,
  isDragOverlay,
}: Props) {
  const { moveSegmentQuestion, removeSegmentQuestion } = useActions().builder
  const segmentQuestion = useAppState((state) => {
    const segment = state.selectedShow!.segments[segmentId]

    if (!isQuestionSegment(segment)) throw new Error('Invalid segment')

    return segment.questions[questionId]
  })

  if (!segmentQuestion) return <p>where am i</p>

  const question = segmentQuestion.question

  return (
    <Wrapper
      ref={disabled ? undefined : setNodeRef}
      transform={transform}
      style={{ transition, opacity: isDragging ? 0.2 : 1 }}
      tabIndex={0}
    >
      <Content
        {...listeners}
        type={question.type}
        isDragOverlay={isDragOverlay}
      >
        <Header>
          <QuestionTitle>{question.question}</QuestionTitle>
          <StyledOptions
            questionId={question.id}
            activeSegmentId={segmentId}
            onRemove={() => {
              removeSegmentQuestion({
                segmentId: segmentId,
                questionId: question.id,
              })
            }}
            onMove={(targetSegmentId) => {
              moveSegmentQuestion({
                question: segmentQuestion,
                fromSegmentId: segmentId,
                toSegmentId: targetSegmentId,
                fromPosition: segmentQuestion.position,
                toPosition: 0,
                forceLast: true,
              })
            }}
          ></StyledOptions>
        </Header>
        <p>{getQuestionAnswer(question)}</p>
      </Content>
    </Wrapper>
  )
}

const Content = styled.div<{ type: Question['type']; isDragOverlay?: boolean }>`
  border-radius: 8px;
  border-top: 4px solid ${({ theme, type }) => theme.colors.types[type]};
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 8px;

  ${({ isDragOverlay }) =>
    isDragOverlay &&
    css`
      transform: scale(1.05);
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        -1px 0 15px 0 rgba(34, 33, 81, 0.01),
        0px 15px 15px 0 rgba(34, 33, 81, 0.25);
    `}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledOptions = styled(QuestionOptions)``

const Wrapper = styled.div<{
  transform?: Transform | null
}>`
  position: relative;
  border-radius: 8px;
  cursor: pointer;

  transform-origin: 0 0;
  touch-action: manipulation;
  transform: ${({ transform }) =>
    `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0) scaleX(${
      transform?.scaleX || 1
    }) scaleY(${transform?.scaleY || 1})`}; // replace with CSS vars?

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
