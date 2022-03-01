import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Spacer } from '../../common/Spacer'
import { QuestionList } from '../../common/QuestionList'
import { useAppState } from '../../../overmind'
import type { Question } from '../../../overmind/types'
import { useState } from 'react'
import { Field, Input, Label } from '../../common/forms'

type Props = {
  segmentName: string
  onSelect: (questionId: Question['id']) => void
}

export function QuestionPicker({ segmentName, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const unusedQuestions = useAppState((state) => state.unusedQuestions)

  const filteredQuestions = unusedQuestions.filter((x) => {
    const questionMatch = x.question
      .toLowerCase()
      .includes(filter.toLowerCase())
    const singleAnswerMatch =
      x.answer.type === 'BUZZ_SINGLE' &&
      x.answer.value.toLowerCase().includes(filter.toLowerCase())
    const multiAnswerMatch =
      x.answer.type === 'OPTIONS_SINGLE' &&
      Object.values(x.answer.options).some((a) =>
        a?.toLowerCase().includes(filter.toLowerCase())
      )

    return questionMatch || singleAnswerMatch || multiAnswerMatch
  })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <BoardNewQuestion />
      <Overlay />
      <Content>
        <Dialog.Title>Select question</Dialog.Title>
        <Dialog.Description>
          Select question to add to segment <strong>{segmentName}</strong>
        </Dialog.Description>
        <Spacer size={16}></Spacer>
        <Field>
          <Label htmlFor="filter">Filter</Label>
          <Input
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
          ></Input>
        </Field>
        <Spacer size={32}></Spacer>
        {filteredQuestions.length > 0 ? ( // TODO move into component?
          <QuestionList
            mode="SELECT"
            questions={filteredQuestions}
            onSelect={(questionId) => {
              onSelect(questionId)
              setOpen(false)
            }}
          ></QuestionList>
        ) : (
          'No unused questions'
        )}
        <Close>
          <Cross1Icon></Cross1Icon>
        </Close>
      </Content>
    </Dialog.Root>
  )
}

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  inset: 0px;
`

const Content = styled(Dialog.Content)`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  overflow-y: auto;
  position: fixed;
`

const Close = styled(Dialog.Close)`
  all: unset;
  font-family: inherit;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary12};
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary4};
  }
`

function BoardNewQuestion() {
  return (
    <TriggerWrapper>
      <PlusCircledIcon></PlusCircledIcon>
      <Spacer axis="horizontal" size={4}></Spacer>
      Add question
    </TriggerWrapper>
  )
}

const TriggerWrapper = styled(Dialog.Trigger)`
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
