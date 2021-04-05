import { useState } from 'react'
import styled from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import { BoardQuestion } from './BoardQuestion/BoardQuestion'
import { useQuestionDrop } from './useQuestionDrop'

export const Drawer = () => {
  const [open, setOpen] = useState(true)
  const { unusedQuestions } = useAppState()
  const { getQuestionSegment, removeSegmentQuestion } = useActions()

  const questionDropArea = useQuestionDrop(null, {
    hover({ id: draggedId }) {
      const draggedFromSegment = getQuestionSegment(draggedId)
      if (!draggedFromSegment) return

      removeSegmentQuestion({
        segmentId: draggedFromSegment.id,
        questionId: draggedId,
      })
    },
  })

  const moveQuestion = () => {} // TODO wat, probably bug?

  return (
    <Wrapper open={open}>
      <DrawerButton onClick={() => setOpen((x) => !x)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </DrawerButton>
      <h1>Drawer</h1>
      <QuestionsList ref={questionDropArea}>
        {unusedQuestions.map((question, index) => (
          <BoardQuestion
            key={question.id}
            question={question}
            segmentId={null}
            move={moveQuestion}
            index={index}
          />
        ))}
      </QuestionsList>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 350px;
  background-color: hsl(0 0% 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(${({ open }) => (open ? 0 : 90)}%);
  transition: transform 0.3s ease-out;
  box-shadow: -10px 0px 35px hsla(0, 0%, 0%, 0.2);
`

const DrawerButton = styled.button`
  align-self: flex-start;
  min-width: 24px;
  min-height: 24px;
  padding: 4px;
  background: none;
  border: 0;
  box-sizing: content-box;
`

const QuestionsList = styled.div`
  min-height: 200px;
  border: 2px dashed hsl(0 0% 80%);
  border-radius: 8px;
  width: 300px;
  overflow-y: scroll;

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`
