import {
  DashboardIcon,
  GearIcon,
  MoonIcon,
  Pencil1Icon,
  PlayIcon,
} from '@radix-ui/react-icons'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Spacer } from './Spacer'
import { ShowSelectPopover } from './ShowSelectPopover'

export function Sidebar() {
  return (
    <Wrapper>
      <Header>
        <ShowSelectPopover />
        <PlayButton to="/play">
          <PlayIcon width={20} height={20}></PlayIcon>
        </PlayButton>
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
      </Menu>
      <BottomMenu>
        <MenuItem>
          <MenuLink to="/foo">
            <MoonIcon></MoonIcon>
            <Spacer size={8} />
            Something
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/settings">
            <GearIcon></GearIcon>
            <Spacer size={8} />
            Settings
          </MenuLink>
        </MenuItem>
      </BottomMenu>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 225px;
  padding: 16px 8px;
  background-color: ${({ theme }) => theme.colors.gray3};
`

const Header = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const BottomMenu = styled(Menu)`
  margin-top: auto;
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

const PlayButton = styled(NavLink)`
  all: unset;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
