import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  onRemove: () => void
  className?: string
}

export function SegmentOptions({ onRemove, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Trigger
        className={className}
        style={{ visibility: open ? 'visible' : undefined }}
      >
        <DotsHorizontalIcon></DotsHorizontalIcon>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item disabled>Edit segment</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Preview segment</DropdownMenu.Item>
        <DropdownMenu.Separator></DropdownMenu.Separator>
        <DropdownMenu.Item danger onSelect={onRemove}>
          Remove segment
        </DropdownMenu.Item>
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
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
