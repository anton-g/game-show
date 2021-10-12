import * as Dialog from '@radix-ui/react-dialog' // TODO replace with alert-dialog
import styled from 'styled-components'
import { Spacer } from '../../common/Spacer'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteQuestionConfirmDialog({
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
