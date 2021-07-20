import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled from 'styled-components'
import { useAppState } from '../../../overmind'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  activeSegmentId: string | null
  onMove: (segmentId: string) => void
  onRemove: () => void
  className?: string
}

export function QuestionOptions({
  activeSegmentId,
  onMove,
  onRemove,
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const { segments } = useAppState()

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Trigger
        className={className}
        style={{ visibility: open ? 'visible' : undefined }}
      >
        <DotsHorizontalIcon></DotsHorizontalIcon>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu>
          <DropdownMenu.Item disabled>Edit</DropdownMenu.Item>
          <DropdownMenu.TriggerItem>
            {!activeSegmentId ? 'Add to segment' : 'Move to segment'}
            <DropdownMenu.TriggerItemIcon></DropdownMenu.TriggerItemIcon>
          </DropdownMenu.TriggerItem>
          <DropdownMenu.Content sideOffset={10}>
            {segments
              .filter((x) => x.id !== activeSegmentId)
              .map((s) => (
                <DropdownMenu.Item key={s.id} onSelect={() => onMove(s.id)}>
                  {s.name}
                </DropdownMenu.Item>
              ))}
          </DropdownMenu.Content>
        </DropdownMenu>
        {activeSegmentId && (
          <DropdownMenu.Item onSelect={onRemove}>
            Remove question
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Item disabled>Open in library</DropdownMenu.Item>
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
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
