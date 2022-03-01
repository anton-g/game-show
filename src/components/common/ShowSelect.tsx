import styled from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import * as Select from '@radix-ui/react-select'
import { TriangleDownIcon } from '@radix-ui/react-icons'

export function ShowSelect() {
  const { selectedShow, shows } = useAppState()
  const { selectShow } = useActions()

  return (
    <Select.Root
      value={selectedShow?.id}
      onValueChange={(showId) => selectShow(showId)}
    >
      <SelectTrigger>
        <Select.Value />
        <Select.Icon>
          <TriangleDownIcon></TriangleDownIcon>
        </Select.Icon>
      </SelectTrigger>
      <SelectContent>
        <Select.ScrollUpButton />
        <Select.Viewport>
          {Object.values(shows).map((show) => (
            <ShowItem key={show.id} value={show.id}>
              <Select.ItemText>{show.name}</Select.ItemText>
              <Select.ItemIndicator />
              <ShowItemInfo>
                {Object.values(show.segments).length} segments
              </ShowItemInfo>
            </ShowItem>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton />
      </SelectContent>
    </Select.Root>
  )
}

const SelectTrigger = styled(Select.Trigger)`
  all: unset;
  font-weight: bold;
  cursor: pointer;
`

const SelectContent = styled(Select.Content)`
  border-radius: 4px;
  padding: 16px;
  width: 260px;
  background-color: white;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  display: flex;
  flex-direction: column;
`

const ShowItem = styled(Select.Item)`
  all: unset;
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  border-radius: 4px;
  user-select: none;

  &:focus {
    border: 0;
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`

const ShowItemInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.8rem;
`
