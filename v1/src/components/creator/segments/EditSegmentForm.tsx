import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import { QuestionSegmentType } from '../../../overmind/types'
import { Button, Field, FieldError, Input, Label } from '../../common/forms'
import { Select } from '../../common/Select'
import { Spacer } from '../../common/Spacer'

type Props = {
  segment: QuestionSegmentType
  onUpdate: (segment: QuestionSegmentType) => void
}

export function EditSegmentForm({ segment, onUpdate }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionSegmentType>({
    defaultValues: segment,
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<QuestionSegmentType> = (data) => {
    onUpdate(data)
  }

  return (
    <>
      <Input {...register('id')} id="id" type="hidden"></Input>
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input
          {...register('name', {
            required: 'Name is required',
          })}
          id="name"
          type="text"
          error={Boolean(errors.name)}
        ></Input>
        {errors.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>
      <Spacer size={16} />
      <Field>
        <Label htmlFor="introType">Intro</Label>
        <Select {...register('intro.type')} name="intro.type" id="introType">
          <option value="NONE">None</option>
          <option value="COMPONENT">Component</option>
        </Select>
      </Field>
      <Spacer size={32} />
      <SaveButton type="submit" onClick={handleSubmit(onSubmit)}>
        Save changes
      </SaveButton>
    </>
  )
}

const SaveButton = styled(Button)`
  align-self: flex-end;
`
