import { DashboardIcon, MoonIcon, Pencil1Icon } from '@radix-ui/react-icons'
import React, { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useActions, useAppState } from '../../overmind'
import { Spacer } from './Spacer'

export function Sidebar() {
  const { selectedShow, shows } = useAppState()
  const { selectShow } = useActions()

  return (
    <Wrapper>
      <Header>
        <Select
          value={selectedShow?.id}
          onChange={(e) => selectShow(e.target.value)}
        >
          {Object.values(shows).map((show) => (
            <option key={show.id} value={show.id}>
              {show.name}
            </option>
          ))}
        </Select>
      </Header>
      <Spacer size={72} />
      <Menu>
        <MenuItem>
          <MenuLink to="/library">
            <DashboardIcon></DashboardIcon>
            <Spacer size={8} />
            Library
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/creator">
            <Pencil1Icon></Pencil1Icon>
            <Spacer size={8} />
            Editor
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/foo">
            <MoonIcon></MoonIcon>
            <Spacer size={8} />
            Something
          </MenuLink>
        </MenuItem>
      </Menu>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 100%;
  min-width: 225px;
  padding: 16px 8px;
  background-color: ${({ theme }) => theme.colors.gray3};
`

const Header = styled.div`
  padding-left: 16px;
`

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const MenuItem = styled.li`
  width: 100%;
`

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  border-radius: 4px;
  line-height: 1;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray12};

  &:hover {
    color: ${({ theme }) => theme.colors.primary11};
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`

type Props = {
  children: ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef(
  ({ children, ...props }: Props, ref: any) => {
    return (
      <SelectWrapper>
        <StyledSelect {...props} ref={ref}>
          {children}
        </StyledSelect>
        <Chevron
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </Chevron>
      </SelectWrapper>
    )
  }
)

const SelectWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  font-weight: bold;
`

const Chevron = styled.svg`
  height: 20px;
  width: 20px;
  margin-left: -20px;
  pointer-events: none;
`

const StyledSelect = styled.select`
  font-size: 16px;
  background-color: transparent;
  border: 0;
  appearance: none;
  width: 100%;
  padding-right: 24px;
`
