import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Question, Segment } from '../../../overmind/state'
import { getQuestionAnswer } from '../../../utils/question-utils'
import { DraggedQuestion, DRAG_TYPES } from '../Board'
import { QuestionOptions } from './QuestionOptions'

type Props = {
  questionId: Question['id']
  segmentId: Segment['id']
}

export function BoardQuestion({ questionId, segmentId }: Props) {
  const { findQuestion, moveOrReorderQuestion, removeSegmentQuestion } =
    useActions()
  const segmentQuestion = useAppState(
    (state) => state.selectedShow!.segments[segmentId].questions[questionId]
  )
  const question = segmentQuestion.question

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DRAG_TYPES.QUESTION,
      item: {
        id: question.id,
        originalPosition: segmentQuestion.position,
      } as DraggedQuestion,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalPosition } = item
        const didDrop = monitor.didDrop()

        if (!didDrop) {
          // "Cancel", dropped outside, move back to original position
          // TEST Does this work?
          moveOrReorderQuestion({
            id: droppedId,
            toPosition: originalPosition,
            toSegmentId: segmentId,
          })
        }
      },
      isDragging: (monitor) => {
        return question.id === monitor.getItem().id
      },
    }),
    [question, segmentId, moveOrReorderQuestion]
  )

  const [, drop] = useDrop(
    () => ({
      accept: DRAG_TYPES.QUESTION,
      canDrop: () => false,
      hover({ id: draggedId }: DraggedQuestion) {
        if (draggedId !== question.id) {
          const { question: hoveredQuestion } = findQuestion(question.id)
          moveOrReorderQuestion({
            id: draggedId,
            toPosition: hoveredQuestion.position,
            toSegmentId: segmentId,
          })
        }
      },
    }),
    [findQuestion, moveOrReorderQuestion, segmentId, question.id]
  )

  return (
    <Wrapper ref={(node) => drag(drop(node))} hideShadow={false}>
      {isDragging && <TargetDropArea />}
      <Content type={question.type}>
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
              // moveSegmentQuestion({
              //   question: segmentQuestion,
              //   fromSegmentId: segmentId,
              //   toSegmentId: targetSegmentId,
              //   fromPosition: segmentQuestion.position,
              //   toPosition: 0, // TODO should probably move to last position
              // })
            }}
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
