import styled from 'styled-components'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & RadixDropdownMenu.DropdownMenuOwnProps

export function DropdownMenu({ children, ...props }: Props) {
  return <RadixDropdownMenu.Root {...props}>{children}</RadixDropdownMenu.Root>
}

DropdownMenu.Trigger = RadixDropdownMenu.Trigger

DropdownMenu.Content = styled(RadixDropdownMenu.Content)`
  min-width: 130;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 4px 6px hsla(0, 0%, 0%, 0.1);
`

DropdownMenu.Item = styled(RadixDropdownMenu.Item)`
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: default;
  &:focus {
    outline: none;
    background-color: dodgerblue;
    color: white;
  }
  &[data-disabled] {
    color: hsl(0 0% 60%);
  }
`

DropdownMenu.NestedTrigger = styled(RadixDropdownMenu.TriggerItem)`
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: default;
  &:focus {
    outline: none;
    background-color: dodgerblue;
    color: white;
  }
  &[data-disabled] {
    color: hsl(0 0% 60%);
  }
`
