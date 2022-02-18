import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Field, Input, Label } from '../../common/forms'
import { Spacer } from '../../common/Spacer'
import { QuestionList } from '../../common/QuestionList'
import { useAppState } from '../../../overmind'

export function Library() {
  const [filter, setFilter] = useState('')
  const { questionsList } = useAppState()

  const filteredQuestions = questionsList.filter((x) =>
    x.question.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Wrapper>
      <Spacer size={16}></Spacer>
      <Controls>
        <Field>
          <Label htmlFor="filter">Filter</Label>
          <Input
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
          ></Input>
        </Field>
        <Spacer axis="horizontal" size={16}></Spacer>
        <Button to="/library/question">Create question</Button>
      </Controls>
      <Spacer size={16}></Spacer>
      <QuestionList mode="LINK" questions={filteredQuestions}></QuestionList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 24px;
`

const Controls = styled.div`
  display: flex;
  align-items: flex-end;
`

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.colors.gray9};
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  transition: background-color 0.15s;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 46px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
`
