import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
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
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)

  return (
    <ButtonWrapper>
      <Button type="submit" onClick={onSave} grouped={editing}>
        Save
      </Button>
      {editing && (
        <>
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
              <DropdownMenu.Item
                onSelect={() => setShowConfirmDeleteDialog(true)}
              >
                Delete
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={onSaveAsNew}>
                Save as new
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
          <DeleteQuestionConfirmDialog
            open={showConfirmDeleteDialog}
            onOpenChange={setShowConfirmDeleteDialog}
            onConfirm={onDelete}
          ></DeleteQuestionConfirmDialog>
        </>
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

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

function DeleteQuestionConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Overlay />
      <Content>
        <Dialog.Title>Delete question</Dialog.Title>
        <Dialog.Description>
          <p>
            Are you sure you want to delete this question{' '}
            <strong>permanently</strong>?
          </p>
        </Dialog.Description>
        <Spacer size={16}></Spacer>
        <ConfirmButtons>
          <CloseButton>No, take me back!</CloseButton>
          <Spacer size={8} axis={'horizontal'}></Spacer>
          <DeleteButton onClick={onConfirm}>Yes, I'm sure.</DeleteButton>
        </ConfirmButtons>
      </Content>
    </Dialog.Root>
  )
}

const Overlay = styled(Dialog.Overlay)`
  background-color: ${({ theme }) => theme.colors.blackA11};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: fit-content;
  max-height: 85vh;
  padding: 20px;
  margin-top: -5vh;
  background-color: white;
  border-radius: 6px;

  &:focus {
    outline: none;
  }
`

const ConfirmButtons = styled.div`
  display: flex;
`

const CloseButton = styled(Dialog.Close)`
  background-color: ${({ theme }) => theme.colors.gray4};
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray12};
  cursor: pointer;
  transition: background-color 0.15s;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.tomato4};
  color: ${({ theme }) => theme.colors.tomato11};
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.15s;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.tomato5};
  }
`
