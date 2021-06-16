import styled, { css } from 'styled-components'
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
  min-width: 180;
  background-color: white;
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
    background-color: dodgerblue;
    color: white;
  }
  &[data-disabled] {
    color: hsl(0 0% 60%);
  }
`

DropdownMenu.Item = styled(RadixDropdownMenu.Item)`
  ${itemStyle}
`

DropdownMenu.TriggerItem = styled(RadixDropdownMenu.TriggerItem)`
  &[data-state='open'] {
    background-color: palevioletred;
  }

  ${itemStyle}
`

const Svg = styled.svg`
  height: 16px;
  width: 16px;
  margin-left: 8px;
`
function Icon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </Svg>
  )
}

DropdownMenu.TriggerItemIcon = Icon
