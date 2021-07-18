import styled, { css } from 'styled-components'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import { CaretRightIcon } from '@radix-ui/react-icons'

type Props = {
  children: ReactNode
} & RadixDropdownMenu.DropdownMenuOwnProps

export function DropdownMenu({ children, ...props }: Props) {
  return <RadixDropdownMenu.Root {...props}>{children}</RadixDropdownMenu.Root>
}

DropdownMenu.Trigger = RadixDropdownMenu.Trigger

DropdownMenu.Content = styled(RadixDropdownMenu.Content)`
  min-width: 180;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 0px 15px hsla(206, 22%, 7%, 0.35);
`

const itemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: default;
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.blue4};
  }
  &[data-disabled] {
    color: ${({ theme }) => theme.colors.gray11};
  }
`

DropdownMenu.Item = styled(RadixDropdownMenu.Item)`
  ${itemStyle}
`

DropdownMenu.TriggerItem = styled(RadixDropdownMenu.TriggerItem)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.blue4};
  }

  ${itemStyle}
`

DropdownMenu.TriggerItemIcon = CaretRightIcon
