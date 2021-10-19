import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Spacer } from '../../common/Spacer'
import type { QuestionSegmentType } from '../../../overmind/types'
import { useActions } from '../../../overmind'
import { EditSegmentForm } from './EditSegmentForm'

type Props = {
  segment: QuestionSegmentType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSegmentDialog({ segment, open, onOpenChange }: Props) {
  const { updateSegment } = useActions().builder

  const handleUpdate = (segmentUpdate: QuestionSegmentType) => {
    updateSegment(segmentUpdate)
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Overlay />
      <Content aria-describedby={`Editing segment ${segment.name}`}>
        <Dialog.Title>Edit segment</Dialog.Title>
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
