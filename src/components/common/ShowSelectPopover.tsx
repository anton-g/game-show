import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import * as Popover from '@radix-ui/react-popover'

export function ShowSelectPopover() {
  const [open, setOpen] = useState(false)
  const { selectedShow, shows } = useAppState()
  const { selectShow } = useActions()

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <span>{selectedShow?.name}</span>
        <TriangleDownIcon />
      </PopoverTrigger>
      <Popover.Anchor />
      <PopoverContent>
        <PopoverArrow offset={35} />
        {Object.values(shows).map((show) => (
          <ShowButton
            key={show.id}
            onClick={() => {
              selectShow(show.id)
              setOpen(false)
            }}
          >
            <ShowButtonTitle>{show.name}</ShowButtonTitle>
            <ShowButtonInfo>
              {Object.values(show.segments).length} segments
            </ShowButtonInfo>
          </ShowButton>
        ))}
      </PopoverContent>
    </Popover.Root>
  )
}
const PopoverTrigger = styled(Popover.Trigger)`
  all: unset;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const PopoverContent = styled(Popover.Content)`
  border-radius: 4px;
  padding: 16px;
  width: 260px;
  background-color: white;
  box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px,
    rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  display: flex;
  flex-direction: column;
`
const PopoverArrow = styled(Popover.Arrow)`
  fill: white;
`
const ShowButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`
const ShowButtonTitle = styled.span`
  font-weight: bold;
`
const ShowButtonInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.8rem;
`
