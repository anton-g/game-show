import { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppState } from '../overmind'

export function Question() {
  const { questions } = useAppState()
  const { questionId } = useParams<{ questionId: string }>()

  const question = questions.find((x) => x.id === questionId)

  return (
    <Wrapper>
      <Columns>
        <FormWrapper>
          <Title>{question?.question} </Title>
          <Field>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              type="text"
              defaultValue={question?.question}
            ></Input>
          </Field>
          <Spacer></Spacer>
          <Field>
            <Label htmlFor="lore">Lore</Label>
            <TextArea id="lore"></TextArea>
          </Field>
          <Spacer></Spacer>
          <Field>
            <Label htmlFor="type">Type</Label>
            <Select id="type">
              <option>test</option>
              <option>test2</option>
            </Select>
          </Field>
        </FormWrapper>
        <Preview>
          <h2>Preview</h2>
        </Preview>
      </Columns>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
`

const Title = styled.h1``

const Columns = styled.div`
  display: flex;
  height: 100%;
`

const FormWrapper = styled.div`
  box-sizing: border-box;
  min-width: 500px;
  max-height: 100%;
  overflow-y: scroll;
  padding: 8px 16px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  padding: 4px 0 8px;
  font-size: 14px;
  font-weight: 500;
`

const Input = styled.input`
  border-radius: 4px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 10px 14px;
`

const TextArea = styled.textarea`
  border-radius: 4px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 10px 14px;
`

const Spacer = styled.div`
  margin-bottom: 16px;
`

const Preview = styled.div`
  flex-grow: 2;
  display: flex;

  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: #ffffff;
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    #eeeeee 0,
    #eeeeee 2px,
    #ffffff 0,
    #ffffff 50%
  );
`

const SelectWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
`

const Chevron = styled.svg`
  grid-area: select;
  justify-self: end;
  margin-right: 16px;
  height: 20px;
  width: 20px;
`

const StyledSelect = styled.select`
  border-radius: 4px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  appearance: none;
  width: 100%;
  grid-area: select;
  padding: 10px 14px;
`

function Select({
  children,
  ...props
}: { children: ReactNode } & React.ComponentPropsWithoutRef<
  typeof StyledSelect
>) {
  return (
    <SelectWrapper>
      <StyledSelect {...props}>{children}</StyledSelect>
      <Chevron
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </Chevron>
    </SelectWrapper>
  )
}
