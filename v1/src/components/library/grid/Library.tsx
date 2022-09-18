import { useState } from 'react'
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
      <Controls>
        <Field>
          <Label htmlFor="filter">Filter</Label>
          <Input
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
          ></Input>
        </Field>
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
