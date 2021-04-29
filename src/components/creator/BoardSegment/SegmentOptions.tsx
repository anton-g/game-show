import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  onRemove: () => void
}

export function SegmentOptions({ onRemove }: Props) {
  return (
    <DropdownMenu>
      <Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onRemove}>
          Remove segment
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled>Preview segment</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const Trigger = styled(DropdownMenu.Trigger)`
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  min-width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
`
