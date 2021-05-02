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
