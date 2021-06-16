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
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
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
