import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import { Segment } from '../../../overmind/state'

type Props = {
  open: boolean
  segments: Segment[]
  onOpenChange: (open: boolean) => void
  onSelectedSegment: (segmentId: string) => void
}

export function QuestionMoveDialog({
  open,
  segments,
  onOpenChange,
  onSelectedSegment,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <StyledOverlay />
      <StyledContent>
        <Title>Select segment</Title>
        {segments.map((segment) => (
          <SegmentButton onClick={() => onSelectedSegment(segment.id)}>
            {segment.name}
          </SegmentButton>
        ))}
        <Dialog.Close>Close</Dialog.Close>
      </StyledContent>
    </Dialog.Root>
  )
}

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: hsl(0 0% 0% / 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: fit-content;
  max-height: 85vh;
  margin-top: -5vh;
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 8px 4px;
  &:focus {
    outline: none;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  padding: 8px 2px;
`

const SegmentButton = styled.button`
  padding: 8px 4px;
  background: none;
  border: 0;
  border-radius: 4px;
  text-align: left;
  font-size: 16px;
  &:hover {
    background-color: dodgerblue;
    color: white;
  }
`
