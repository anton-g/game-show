import styled from 'styled-components'
import { useAppState } from '../../../overmind'
import { DropdownMenu } from '../../common/DropdownMenu'

type Props = {
  activeSegmentId: string | null
  onMove: (segmentId: string) => void
  onRemove: () => void
}

export function QuestionOptions({ activeSegmentId, onMove, onRemove }: Props) {
  const { segments } = useAppState()

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
        <DropdownMenu>
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
