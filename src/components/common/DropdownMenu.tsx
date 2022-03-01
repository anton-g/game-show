import styled, { css } from 'styled-components'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import { CaretRightIcon } from '@radix-ui/react-icons'

type Props = {
  children: ReactNode
} & RadixDropdownMenu.DropdownMenuProps

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

const itemStyle = css<{ $danger?: true }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: default;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.tomato11 : 'inherit'};
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.blue4};
  }
  &[data-disabled] {
    color: ${({ theme }) => theme.colors.gray11};
  }
`

DropdownMenu.Item = styled(RadixDropdownMenu.Item)<{ $danger?: true }>`
  ${itemStyle}
`

DropdownMenu.TriggerItem = styled(RadixDropdownMenu.TriggerItem)<{
  $danger?: true
}>`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.blue4};
  }

  ${itemStyle}
`

DropdownMenu.TriggerItemIcon = CaretRightIcon

DropdownMenu.Separator = styled(RadixDropdownMenu.Separator)`
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};
`
