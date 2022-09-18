import {
  DashboardIcon,
  GearIcon,
  MoonIcon,
  Pencil1Icon,
  PlayIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { NavLink, useMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Spacer } from './Spacer'
import { ShowSelect } from './ShowSelect'

export function Sidebar() {
  return (
    <Wrapper>
      <Header>
        <ShowSelect />
        <PlayButton to="/play">
          <PlayIcon width={20} height={20}></PlayIcon>
        </PlayButton>
      </Header>
      <Spacer size={48} />
      <Menu>
        <MenuItem>
          <MenuLink to="/library">
            <DashboardIcon></DashboardIcon>
            <Spacer size={8} />
            Library
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/editor">
            <Pencil1Icon></Pencil1Icon>
            <Spacer size={8} />
            Editor
          </MenuLink>
        </MenuItem>
      </Menu>
      <Spacer size={48} />
      <LibrarySubMenu></LibrarySubMenu>
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

  &:focus-visible {
    outline: revert;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`

function LibrarySubMenu() {
  const routeMatch = useMatch('/library')
  if (!routeMatch) return null

  return (
    <Menu>
      <MenuItem>
        <MenuLink to="question">
          <PlusCircledIcon></PlusCircledIcon>
          <Spacer size={8} />
          New question
        </MenuLink>
      </MenuItem>
    </Menu>
  )
}
