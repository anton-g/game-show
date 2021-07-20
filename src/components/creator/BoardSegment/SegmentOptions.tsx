import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  onRemove: () => void
}

export function SegmentOptions({ onRemove }: Props) {
  return (
    <DropdownMenu>
      <Trigger>
        <DotsHorizontalIcon></DotsHorizontalIcon>
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
