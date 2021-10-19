import { useDroppable } from '@dnd-kit/core'
import { TrashIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'

export function Trash({ id }: { id: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <Wrapper ref={setNodeRef} isOver={isOver}>
      <Icon isOver={isOver} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isOver: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 50%;
  margin-left: -25px;
  top: 10px;
  width: 60px;
  height: 60px;
  font-size: 24px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${({ theme, isOver }) =>
    isOver ? theme.colors.tomato11 : theme.colors.gray3};
  background-color: ${({ theme, isOver }) =>
    isOver ? theme.colors.tomato4 : 'white'};
`

const Icon = styled(TrashIcon)<{ isOver: boolean }>`
  width: 24px;
  height: 24px;
  color: ${({ theme, isOver }) => (isOver ? theme.colors.tomato11 : 'inherit')};
`
