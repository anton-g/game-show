import styled from 'styled-components'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'

const StyledContent = styled(RadixDropdownMenu.Content)`
  min-width: 130;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 5px 15px -5px hsla(206, 22%, 7%, 0.15);
`

const StyledItem = styled(RadixDropdownMenu.Item)`
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: default;
  &:focus {
    outline: none;
    background-color: dodgerblue;
    color: white;
  }
`

type Props = {
  children: ReactNode
}
export function DropdownMenu({ children }: Props) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>
}

DropdownMenu.Trigger = RadixDropdownMenu.Trigger
DropdownMenu.Content = StyledContent
DropdownMenu.Item = StyledItem
