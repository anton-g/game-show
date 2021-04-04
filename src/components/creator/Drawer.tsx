import { useState } from 'react'
import styled from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import { BoardQuestion } from './BoardQuestion/BoardQuestion'
import { useQuestionDrop } from './useQuestionDrop'

export const Drawer = () => {
  const [open, setOpen] = useState(true)
  const { unusedQuestions } = useAppState()
  const { addSegment, getQuestionSegment, removeSegmentQuestion } = useActions()

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

  const moveQuestion = () => {}
  const reorderQuestion = () => {}

  return (
    <Wrapper open={open}>
      <button
        style={{ alignSelf: 'flex-start' }}
        onClick={() => setOpen((x) => !x)}
      >
        X
      </button>
      <h1>Drawer</h1>
      <button onClick={() => addSegment()} style={{ marginBottom: 16 }}>
        Mock segment
      </button>
      <QuestionsList ref={questionDropArea}>
        {unusedQuestions.map((question, index) => (
          <BoardQuestion
            key={question.id}
            question={question}
            segmentId={null}
            move={moveQuestion}
            reorder={reorderQuestion}
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
  background-color: hsl(0 0% 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(${({ open }) => (open ? 0 : 90)}%);
  transition: transform 0.3s ease-out;
`

const QuestionsList = styled.div`
  min-height: 200px;
  border: 2px dashed hsl(0 0% 90%);
  width: 300px;
  overflow-y: scroll;
`
