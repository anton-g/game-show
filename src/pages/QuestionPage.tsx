import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { DropdownMenu } from '../components/common/DropdownMenu'
import {
  Field,
  FieldError,
  Input,
  Label,
  TextArea,
} from '../components/common/forms'
import { Select } from '../components/common/Select'
import { Spacer } from '../components/common/Spacer'
import { useActions, useAppState } from '../overmind'
import { AnswerType, Question } from '../overmind/state'

export function QuestionPage() {
  const { questionId } = useParams<{ questionId?: string }>()
  const { questions } = useAppState()
  const { createQuestion, updateQuestion, deleteQuestion } = useActions()
  const question = questionId ? questions[questionId] : undefined
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Question>({
    defaultValues: question,
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<Question> = (data) => {
    if (!data.id) {
      createQuestion(data)
      return
    }

    updateQuestion(data)
  }
  const onSubmitAsNew: SubmitHandler<Question> = (data) => {
    createQuestion(data)
  }
  const handleDelete = () => {
    if (!questionId) return

    // show confirm

    deleteQuestion(questionId)
  }

  const answerType = watch('answer.type') as AnswerType

  return (
    <Wrapper>
      <Columns>
        <Form>
          <Input {...register('id')} id="id" type="hidden"></Input>
          <Spacer size={16} />
          <Title>{watch('question') || '-'}</Title>
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
            {errors.question && (
              <FieldError>{errors.question.message}</FieldError>
            )}
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
          <Spacer size={32} />
          <SubTitle>Scoring</SubTitle>
          <Spacer size={8} />
          <Field>
            <Label htmlFor="score">Score</Label>
            <Input
              {...register('scoring.value', {
                valueAsNumber: true, // TODO more robust handling
                required: 'You need to specify a score',
              })}
              id="score"
              type="number"
            ></Input>
            {errors.scoring?.value && (
              <FieldError>{errors.scoring.value.message}</FieldError>
            )}
          </Field>
          <Spacer size={48} />
          <QuestionFormButtons
            editing={Boolean(questionId)}
            onSave={handleSubmit(onSubmit)}
            onSaveAsNew={() => handleSubmit(onSubmitAsNew)()}
            onDelete={handleDelete}
          ></QuestionFormButtons>
          <Spacer size={48} />
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

type Props = {
  onSave: () => void
  onSaveAsNew: () => void
  onDelete: () => void
  editing: boolean
}

function QuestionFormButtons({
  onSave,
  onSaveAsNew,
  onDelete,
  editing,
}: Props) {
  return (
    <ButtonWrapper>
      <Button type="submit" onClick={onSave} grouped={editing}>
        Save
      </Button>
      {editing && (
        <DropdownMenu>
          <DropdownButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{
                height: 20,
                width: 20,
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownButton>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={onDelete}>Delete</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={onSaveAsNew}>
              Save as new
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button<{ grouped: boolean }>`
  background-color: ${({ theme }) => theme.colors.gray9};
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }

  ${({ grouped }) =>
    grouped &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}
`

const DropdownButton = styled(DropdownMenu.Trigger)`
  background-color: ${({ theme }) => theme.colors.gray9};
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.gray10};
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  transition: background-color 0.15s;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
`
