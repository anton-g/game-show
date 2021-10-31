import { CaretDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled from 'styled-components'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  onRemove: () => void
  onEdit: () => void
  className?: string
}

export function QuestionSegmentOptions({ onRemove, onEdit, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Trigger
        className={className}
        style={{ visibility: open ? 'visible' : undefined }}
      >
        <CaretDownIcon></CaretDownIcon>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onEdit}>Edit segment</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Preview segment</DropdownMenu.Item>
        <DropdownMenu.Item danger onSelect={onRemove}>
          Remove segment
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const Trigger = styled(DropdownMenu.Trigger)`
  cursor: pointer;
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  border-radius: 4px;
  padding: 8px 4px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  svg {
    height: 20px;
    width: 20px;
  }
`
