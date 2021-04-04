import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  inLibrary: boolean
  onMove: () => void
  onRemove: () => void
}

export function QuestionOptions({ inLibrary, onMove, onRemove }: Props) {
  return (
    <DropdownMenu>
      <Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onMove}>
          {inLibrary ? 'Add' : 'Move'}
        </DropdownMenu.Item>
        {!inLibrary && (
          <DropdownMenu.Item onSelect={onRemove}>Remove</DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const Trigger = styled(DropdownMenu.Trigger)`
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
`
