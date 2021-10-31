import { CaretDownIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { DropdownMenu } from '../common/DropdownMenu'

type Props = {
  questionId: string
  activeSegmentId: string | null
  onMove: (segmentId: string) => void
  onRemove: () => void
  className?: string
}

export const QuestionOptions = React.memo(function QuestionOptions({
  questionId,
  activeSegmentId,
  onMove,
  onRemove,
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const { selectedShow: currentShow } = useAppState()
  const history = useHistory()

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <Trigger
        className={className}
        style={{ visibility: open ? 'visible' : undefined }}
      >
        <CaretDownIcon></CaretDownIcon>
      </Trigger>
      <DropdownMenu.Content>
        <DropdownMenu>
          <DropdownMenu.Item
            onSelect={() => history.push(`/library/question/${questionId}`)}
          >
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.TriggerItem>
            {!activeSegmentId ? 'Add to segment' : 'Move to segment'}
            <DropdownMenu.TriggerItemIcon></DropdownMenu.TriggerItemIcon>
          </DropdownMenu.TriggerItem>
          <DropdownMenu.Content sideOffset={10}>
            {currentShow &&
              Object.values(currentShow?.segments)
                .filter(
                  (x) => x.id !== activeSegmentId && x.type === 'QUESTIONS'
                )
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
})

const Trigger = styled(DropdownMenu.Trigger)`
  cursor: pointer;
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  border-radius: 4px;
  padding: 3px 3px;
  display: flex;
  align-items: center;
  max-height: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  svg {
    height: 12px;
    width: 12px;
  }
`
