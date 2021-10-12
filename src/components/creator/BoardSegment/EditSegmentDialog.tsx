import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Field, FieldError, Input, Label } from '../../common/forms'
import { Spacer } from '../../common/Spacer'
import { Segment } from '../../../overmind/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActions } from '../../../overmind'

type Props = {
  segment: Segment
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSegmentDialog({ segment, open, onOpenChange }: Props) {
  const { updateSegment } = useActions().builder

  const handleUpdate = (segmentUpdate: Segment) => {
    updateSegment(segmentUpdate)
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Overlay />
      <Content>
        <Dialog.Title>Edit segment</Dialog.Title>
        <Dialog.Description>description</Dialog.Description>
        <Spacer size={8}></Spacer>
        <EditSegmentForm segment={segment} onUpdate={handleUpdate} />
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
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  padding: 32px;
  overflow-y: scroll;
  position: fixed;
  border-radius: 8px;
  box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px,
    rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

type FormProps = {
  segment: Segment
  onUpdate: (segment: Segment) => void
}

function EditSegmentForm({ segment, onUpdate }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Segment>({
    defaultValues: segment,
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<Segment> = (data) => {
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
