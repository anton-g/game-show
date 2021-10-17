import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Question, QuestionSegmentType } from '../../../overmind/types'
import { getQuestionAnswer } from '../../../utils/question-utils'
import { isQuestionSegment } from '../../../utils/type-utils'
import { DraggedQuestion, DRAG_TYPES } from '../Board'
import { QuestionOptions } from './QuestionOptions'

type Props = {
  questionId: Question['id']
  segmentId: QuestionSegmentType['id']
}

export function BoardQuestion({ questionId, segmentId }: Props) {
  const {
    findQuestion,
    moveOrReorderQuestion,
    moveSegmentQuestion,
    removeSegmentQuestion,
  } = useActions().builder
  const segmentQuestion = useAppState((state) => {
    const segment = state.selectedShow!.segments[segmentId]

    if (!isQuestionSegment(segment)) throw new Error('Invalid segment')

    return segment.questions[questionId]
  })
  const question = segmentQuestion.question

  return (
    <Wrapper hideShadow={false}>
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
