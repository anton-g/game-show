import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import { Spacer } from '../../common/Spacer'

export function QuestionPicker() {
  return (
    <Dialog.Root open={true}>
      <Dialog.Trigger />
      <Overlay />
      <Content>
        <Dialog.Title>Select question</Dialog.Title>
        <Dialog.Description>
          Select question to add to segment X
        </Dialog.Description>

        <Close>X</Close>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`

const Close = styled(Dialog.Close)`
  all: unset;
  font-family: inherit;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgb(87, 70, 175);
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 100%;

  &:hover {
    background-color: rgb(237, 233, 254);
  }
`
