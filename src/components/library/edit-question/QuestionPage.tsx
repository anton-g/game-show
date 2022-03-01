import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  CheckboxField,
  Field,
  FieldError,
  Input,
  Label,
  TextArea,
} from '../../common/forms'
import { Select } from '../../common/Select'
import { Spacer } from '../../common/Spacer'
import { useActions, useAppState } from '../../../overmind'
import type {
  AnswerType,
  Question,
  QuestionType,
} from '../../../overmind/types'
import { QuestionFormButtons } from './QuestionFormButtons'
import { QuestionPreview } from './QuestionPreview'

export function QuestionPage() {
  const { questionId } = useParams<{ questionId?: string }>()
  const { questions } = useAppState()
  const { createQuestion, updateQuestion, deleteQuestion } =
    useActions().library
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
    deleteQuestion(questionId)
  }

  const answerType = watch('answer.type') as AnswerType
  const questionType = watch('type') as Question['type']

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
            <Label htmlFor="questionType">Display type</Label>
            <Select {...register('type')} id="questionType">
              <option value="TEXT">Text</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
              <option value="SOUND">Sound</option>
            </Select>
          </Field>
          <Spacer size={16} />
          <QuestionTypeInputs questionType={questionType} register={register} />
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
              <option value="PHYSICAL">Physical</option>
            </Select>
          </Field>
          <Spacer size={16} />
          <AnswerTypeInputs
            answerType={answerType}
            register={register}
            watch={watch}
          />
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
          <Spacer size={32} />
          <SubTitle>Other</SubTitle>
          <Spacer size={16} />
          <Field>
            <Label htmlFor="timerValue">Time limit</Label>
            <Input
              {...register('settings.timeLimit')}
              id="timerValue"
              type="number"
              min="0"
            ></Input>
          </Field>
          <Spacer size={16} />
          <CheckboxField>
            <Label htmlFor="manualReveal">Manual reveal</Label>
            <Checkbox
              {...register('settings.manualReveal')}
              id="manualReveal"
            ></Checkbox>
          </CheckboxField>
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
          <QuestionPreview question={question}></QuestionPreview>
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
  overflow-y: auto;
  padding: 8px 16px;
`

const Preview = styled.div`
  flex-grow: 2;
  display: flex;

  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: ${({ theme }) => theme.colors.gray1};
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.gray3} 0,
    ${({ theme }) => theme.colors.gray3} 2px,
    ${({ theme }) => theme.colors.gray1} 0,
    ${({ theme }) => theme.colors.gray1} 50%
  );
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const InputWithRadio = styled.div`
  display: flex;
  align-items: center;
`

const GrowInput = styled(Input)`
  flex-grow: 1;
`

const RadioButton = styled.input`
  height: 20px;
  width: 20px;
  margin: 0 14px 0 28px;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 20px;
  width: 20px;
  margin: 0;
`

function AnswerTypeInputs({
  answerType,
  register,
  watch,
}: {
  answerType: AnswerType
  register: UseFormRegister<Question>
  watch: UseFormWatch<Question>
}) {
  switch (answerType) {
    case 'BUZZ_SINGLE':
      return <AnswerInputBuzzSingle register={register} />
    case 'OPTIONS_SINGLE':
      return <AnswerInputOptionsSingle register={register} watch={watch} />
    case 'PHYSICAL':
      return <AnswerInputPhysical register={register} />
    default:
      const _exhaustiveCheck: never = answerType
      return _exhaustiveCheck
  }
}

function AnswerInputBuzzSingle({
  register,
}: {
  register: UseFormRegister<Question>
}) {
  return (
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
  )
}

function AnswerInputOptionsSingle({
  register,
  watch,
}: {
  register: UseFormRegister<Question>
  watch: UseFormWatch<Question>
}) {
  return (
    <>
      <Spacer size={16} />
      <Field>
        <LabelWrapper>
          <Label htmlFor="optionA">Option A</Label>
          <Label>Correct</Label>
        </LabelWrapper>
        <InputWithRadio>
          <GrowInput
            {...register('answer.options.a')}
            id="optionA"
            type="text"
          ></GrowInput>
          <RadioButton
            {...register('answer.correctOption', {
              required: true,
            })}
            type="radio"
            value="a"
            disabled={!Boolean(watch('answer.options.a'))}
          ></RadioButton>
        </InputWithRadio>
      </Field>
      <Spacer size={16} />
      <Field>
        <Label htmlFor="optionB">Option B</Label>
        <InputWithRadio>
          <GrowInput
            {...register('answer.options.b')}
            id="optionB"
            type="text"
          ></GrowInput>
          <RadioButton
            {...register('answer.correctOption', {
              required: true,
            })}
            type="radio"
            value="b"
            disabled={!Boolean(watch('answer.options.b'))}
          ></RadioButton>
        </InputWithRadio>
      </Field>
      <Spacer size={16} />
      <Field>
        <Label htmlFor="optionC">Option C</Label>
        <InputWithRadio>
          <GrowInput
            {...register('answer.options.c')}
            id="optionC"
            type="text"
          ></GrowInput>
          <RadioButton
            {...register('answer.correctOption', {
              required: true,
            })}
            type="radio"
            value="c"
            disabled={!Boolean(watch('answer.options.c'))}
          ></RadioButton>
        </InputWithRadio>
      </Field>
      <Spacer size={16} />
      <Field>
        <Label htmlFor="optionD">Option D</Label>
        <InputWithRadio>
          <GrowInput
            {...register('answer.options.d')}
            id="optionD"
            type="text"
          ></GrowInput>
          <RadioButton
            {...register('answer.correctOption', {
              required: true,
            })}
            type="radio"
            value="false"
            disabled={!Boolean(watch('answer.options.d'))}
          ></RadioButton>
        </InputWithRadio>
      </Field>
    </>
  )
}

function AnswerInputPhysical({
  register,
}: {
  register: UseFormRegister<Question>
}) {
  return (
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
  )
}

function QuestionTypeInputs({
  questionType,
  register,
}: {
  questionType: QuestionType
  register: UseFormRegister<Question>
}) {
  switch (questionType) {
    case 'TEXT':
      return null
    case 'IMAGE':
      return <QuestionInputImage register={register} />
    case 'SOUND':
      return null
    case 'VIDEO':
      return null
    default:
      const _exhaustiveCheck: never = questionType
      return _exhaustiveCheck
  }
}

function QuestionInputImage({
  register,
}: {
  register: UseFormRegister<Question>
}) {
  return (
    <>
      <Field>
        <Label htmlFor="imageSrc">Image URL</Label>
        <Input
          {...register('assets.imageSrc', {
            required: 'You need to specify an image URL',
          })}
          id="imageSrc"
          type="text"
        ></Input>
      </Field>
      <Spacer size={16} />
      <CheckboxField>
        <Label htmlFor="imageBlur">Blur reveal</Label>
        <Checkbox {...register('settings.blurImage')} id="imageBlur"></Checkbox>
      </CheckboxField>
    </>
  )
}
