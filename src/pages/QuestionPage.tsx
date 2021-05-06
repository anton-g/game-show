import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Select } from '../components/common/Select'
import { Spacer } from '../components/common/Spacer'
import { useAppState } from '../overmind'
import { AnswerType, Question } from '../overmind/state'

export function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const { questions } = useAppState()
  const question = questions.find((x) => x.id === questionId)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Question>({
    defaultValues: question,
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<Question> = (data) => console.log(data)

  const answerType = watch('answer.type') as AnswerType

  return (
    <Wrapper>
      <Columns>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Spacer size={16} />
          <Title>{watch('question')} </Title>
          <Spacer size={16} />
          <Field>
            <Label htmlFor="question">Question</Label>
            <Input
              {...register('question', {
                required: 'You need to specify a question',
              })}
              id="question"
              type="text"
              error={Boolean(errors.question)}
            ></Input>
            {errors.question && <FieldError>This field is required</FieldError>}
          </Field>
          <Spacer size={16} />
          <Field>
            <Label htmlFor="lore">Lore</Label>
            <TextArea {...register('lore')} id="lore"></TextArea>
          </Field>
          <Spacer size={16} />
          <Field>
            <Label htmlFor="questionType">Question type</Label>
            <Select {...register('type')} id="questionType">
              <option value="TEXT">Text</option>
              <option value="VIDEO">Video</option>
              {/* <option value="SOUND">Sound</option>
              <option value="IMAGE">Image</option> */}
            </Select>
          </Field>
          <Spacer size={32} />
          <SubTitle>Answer</SubTitle>
          <Spacer size={8} />
          <Field>
            <Label htmlFor="answerType">Type</Label>
            <Select
              {...register('answer.type')}
              name="answer.type"
              id="answerType"
            >
              <option value="BUZZ_SINGLE">Buzzer - Single</option>
              <option value="OPTIONS_SINGLE">Option - Single</option>
              {/* <option value="OPTIONS_MULTI">Option - Multiple</option>
              <option value="PHYSICAL">Physical</option> */}
            </Select>
          </Field>
          <Spacer size={16} />
          {answerType === 'BUZZ_SINGLE' && (
            <Field>
              <Label htmlFor="answerValue">Answer</Label>
              <Input
                {...register('answer.value', {
                  required: 'You need to specify an answer',
                })}
                id="answerValue"
                type="text"
              ></Input>
            </Field>
          )}
          {answerType === 'OPTIONS_SINGLE' && (
            <>
              <Spacer size={16} />
              <Field>
                <Label htmlFor="optionA">Option A</Label>
                <Input
                  {...register('answer.options.a')}
                  id="optionA"
                  type="text"
                ></Input>
              </Field>
              <Spacer size={16} />
              <Field>
                <Label htmlFor="optionB">Option B</Label>
                <Input
                  {...register('answer.options.b')}
                  id="optionB"
                  type="text"
                ></Input>
              </Field>
              <Spacer size={16} />
              <Field>
                <Label htmlFor="optionC">Option C</Label>
                <Input
                  {...register('answer.options.c')}
                  id="optionC"
                  type="text"
                ></Input>
              </Field>
              <Spacer size={16} />
              <Field>
                <Label htmlFor="optionD">Option D</Label>
                <Input
                  {...register('answer.options.d')}
                  id="optionD"
                  type="text"
                ></Input>
              </Field>
            </>
          )}
          <Spacer size={24} />
          <Button type="submit">Submit</Button>
          <Spacer size={24} />
        </Form>
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

const Title = styled.h1`
  min-height: 50px;
`

const SubTitle = styled.h2``

const Columns = styled.div`
  display: flex;
  height: 100%;
`

const Form = styled.form`
  min-width: 500px;
  max-width: 500px;
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

const Input = styled.input<{ error?: boolean }>`
  border-radius: 4px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 10px 14px;

  ${(p) =>
    p.error &&
    css`
      border-color: #f87171;
    `}
`

const FieldError = styled.span`
  font-size: 14px;
  color: #dc2626;
  font-weight: 500;
`

const TextArea = styled.textarea`
  border-radius: 4px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 10px 14px;
`

const Button = styled.button`
  background-color: #4b5563;
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  color: #f9fafb;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #374151;
  }
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
